// my-gallery/scripts/analyzeImageColors.js
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');
const ColorThief = require('colorthief').default || require('colorthief');
console.log('ColorThief version:', ColorThief.version);
const KMeans = require('node-kmeans');
const sequelize = require('../config/database');
const Photo = require('../models/Photo');
const PhotoColor = require('../models/PhotoColor');
const ColorShade = require('../models/ColorShade');
const colorShadeMatrix = require('../data/colorShadeMatrix');
const Jimp = require('jimp');

console.log('Color Shade Matrix:', colorShadeMatrix);

async function analyzeImageJimp(imagePath, numColors) {
    const image = await Jimp.read(imagePath);
    const width = image.getWidth();
    const height = image.getHeight();
    const totalPixels = width * height;

    const colorCounts = {};

    image.scan(0, 0, width, height, function(x, y, idx) {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];
        const shade = findClosestColorShade(r, g, b);
        const key = shade.colorCategoryName;
        colorCounts[key] = (colorCounts[key] || 0) + 1;
    });

    console.log('Color counts:', colorCounts);

    const sortedColors = Object.entries(colorCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, numColors);

    console.log('Sorted colors:', sortedColors);

    return sortedColors.map(([key, count]) => {
        const shade = colorShadeMatrix.find(s => s.colorCategoryName === key);
        if (!shade) {
            console.error(`No shade found for color category: ${key}`);
            return null;
        }
        const percentage = (count / totalPixels) * 100;
        return {
            rgb: hexToRgb(shade.colorCode),
            percentage: percentage.toFixed(2),
            hexColor: shade.colorCode,
            colorName: shade.name,
            colorCategoryName: shade.colorCategoryName
        };
    }).filter(color => color !== null);
}

function findClosestColorShade(r, g, b) {
    for (const shade of colorShadeMatrix) {
        if (r >= shade.minRed && r <= shade.maxRed &&
            g >= shade.minGreen && g <= shade.maxGreen &&
            b >= shade.minBlue && b <= shade.maxBlue) {
            return shade;
        }
    }

    // If no exact match, find the closest shade
    let closestShade = colorShadeMatrix[0];
    let minDistance = Infinity;

    for (const shade of colorShadeMatrix) {
        const distance = Math.sqrt(
            Math.pow(r - (shade.minRed + shade.maxRed) / 2, 2) +
            Math.pow(g - (shade.minGreen + shade.maxGreen) / 2, 2) +
            Math.pow(b - (shade.minBlue + shade.maxBlue) / 2, 2)
        );
        if (distance < minDistance) {
            minDistance = distance;
            closestShade = shade;
        }
    }

    console.log(`Closest shade for RGB(${r},${g},${b}):`, closestShade);
    return closestShade;
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
}

function analyzeImageSimpleBinning(imagePath, numColors) {
    return new Promise(async (resolve, reject) => {
        try {
            const image = await loadImage(imagePath);
            const canvas = createCanvas(image.width, image.height);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0);
            
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const totalPixels = imageData.data.length / 4;
            const colorBins = {};

            for (let i = 0; i < imageData.data.length; i += 4) {
                const r = Math.floor(imageData.data[i] / 32) * 32;
                const g = Math.floor(imageData.data[i + 1] / 32) * 32;
                const b = Math.floor(imageData.data[i + 2] / 32) * 32;
                const key = `${r},${g},${b}`;
                colorBins[key] = (colorBins[key] || 0) + 1;
            }

            const sortedColors = Object.entries(colorBins)
                .sort(([, a], [, b]) => b - a)
                .slice(0, numColors);

            const palette = sortedColors.map(([key, count]) => {
                const [r, g, b] = key.split(',').map(Number);
                const percentage = (count / totalPixels) * 100;
                return {
                    rgb: [r, g, b],
                    percentage: percentage.toFixed(2),
                    hexColor: `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
                };
            });

            resolve(palette);
        } catch (error) {
            reject(error);
        }
    });
}

async function analyzeImage(imagePath, method = 'jimp', numColors = 5) {
    try {
        if (method === 'jimp') {
            console.log('Using Jimp method with color shade matrix');
            return await analyzeImageJimp(imagePath, numColors);
        } else if (method === 'kmeans') {
            console.log('Using K-means method');
            return await analyzeImageKMeans(imagePath, numColors);
        } else {
            console.log('Using ColorThief method');
            return await analyzeImageColorThief(imagePath, numColors);
        }
    } catch (error) {
        console.error(`Error analyzing image with ${method}:`, error);
        throw error;
    }
}

async function analyzeImageColorThief(imagePath, numColors) {
    try {
        console.log('Starting ColorThief analysis');
        const ColorThief = require('colorthief');
        console.log('ColorThief imported successfully');
        console.log('ColorThief imported:', ColorThief);
        
        const image = await loadImage(imagePath);
        console.log('Image loaded');
        
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        console.log('Image drawn to canvas');
        
        const colorThief = new ColorThief();
        console.log('ColorThief instance created');
        
        const palette = await colorThief.getPalette(canvas, numColors);
        console.log('Palette extracted:', palette);
        
        return Promise.all(palette.map(async color => {
            const [r, g, b] = color;
            return {
                rgb: color,
                percentage: await calculateColorPercentage(canvas, color),
                hexColor: `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
            };
        }));
    } catch (error) {
        console.error('Error in analyzeImageColorThief:', error);
        throw error;
    }
}

function analyzeImageKMeans(imagePath, numColors) {
    return new Promise(async (resolve, reject) => {
        try {
            const image = await loadImage(imagePath);
            const canvas = createCanvas(image.width, image.height);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0);
            
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = [];
            for (let i = 0; i < imageData.data.length; i += 4) {
                pixels.push([imageData.data[i], imageData.data[i+1], imageData.data[i+2]]);
            }
            
            KMeans.clusterize(pixels, {k: numColors}, (err, result) => {
                if (err) reject(err);
                const totalPixels = pixels.length;
                const colorCounts = new Array(numColors).fill(0);
                
                // Count pixels for each cluster
                result[0].clusterInd.forEach((clusterIndex) => {
                    colorCounts[clusterIndex]++;
                });
                
                const palette = result.map((cluster, index) => {
                    const [r, g, b] = cluster.centroid.map(Math.round);
                    const percentage = (colorCounts[index] / totalPixels) * 100;
                    return {
                        rgb: [r, g, b],
                        percentage: percentage.toFixed(2),
                        hexColor: `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
                    };
                });
                resolve(palette);
            });
        } catch (error) {
            reject(error);
        }
    });
}

async function calculateColorPercentage(canvas, targetColor) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let matchingPixels = 0;
    const totalPixels = imageData.data.length / 4;
    
    for (let i = 0; i < imageData.data.length; i += 4) {
        if (isColorMatch(imageData.data.slice(i, i+3), targetColor)) {
            matchingPixels++;
        }
    }
    
    return (matchingPixels / totalPixels) * 100;
}

function isColorMatch(color1, color2, tolerance = 25) {
    return Math.abs(color1[0] - color2[0]) <= tolerance &&
           Math.abs(color1[1] - color2[1]) <= tolerance &&
           Math.abs(color1[2] - color2[2]) <= tolerance;
}

async function findClosestColorShade(rgb) {
    try {
        const colorShades = await ColorShade.findAll();
        let closestShade = null;
        let minDistance = Infinity;
        
        for (const shade of colorShades) {
            const distance = Math.sqrt(
                Math.pow(rgb[0] - (shade.minRed + shade.maxRed) / 2, 2) +
                Math.pow(rgb[1] - (shade.minGreen + shade.maxGreen) / 2, 2) +
                Math.pow(rgb[2] - (shade.minBlue + shade.maxBlue) / 2, 2)
            );
            
            if (distance < minDistance) {
                minDistance = distance;
                closestShade = shade;
            }
        }
        
        return closestShade;
    } catch (error) {
        console.error('Error in findClosestColorShade:', error);
        return null;
    }
}

async function analyzeImagesInFolder(folderDate, method = 'jimp', numColors = 5) {
    const year = '20' + folderDate.substr(0, 2);
    const month = folderDate.substr(2, 2);
    const folderPath = path.join('/Users/jpmiles/JPMilesArtGallery/my-gallery/public/assets/images/originals', year, month, folderDate);

    const startTime = Date.now();
    let processedImages = 0;
    
    const files = fs.readdirSync(folderPath);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));
    
    for (const file of imageFiles) {
        const imagePath = path.join(folderPath, file);
        const photoId = path.basename(file, path.extname(file));
        
        try {
            console.log(`Analyzing ${file} with ${method} method`);
            const colors = await analyzeImage(imagePath, method, numColors);
            const photo = await Photo.findOne({ where: { photoID: photoId } });
            
            if (photo) {
                await PhotoColor.destroy({ where: { photoId: photo.photoID } });
                
                const colorData = {};
                for (let i = 0; i < colors.length; i++) {
                    const color = colors[i];
                    colorData[`shade${i+1}ColorName`] = color.colorName;
                    colorData[`shade${i+1}Percentage`] = parseFloat(color.percentage);
                    colorData[`shade${i+1}ExactColorHex`] = color.hexColor;
                }
                
                await PhotoColor.create({
                    photoId: photo.photoID,
                    ...colorData
                });
                console.log(`Created PhotoColor record for ${photo.photoID}`);
            } else {
                console.log(`No photo found with ID ${photoId}`);
            }
            
            processedImages++;
            console.log(`Processed ${processedImages} images`);
        } catch (error) {
            console.error(`Error processing ${file}:`, error);
        }
    }
    
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000; // in seconds
    
    console.log(`Analysis complete.`);
    console.log(`Processed ${processedImages} images in ${duration} seconds.`);
    console.log(`Average time per image: ${duration / processedImages} seconds.`);
}

// Example usage
const folderDate = process.argv[2] || '230311'; // Default to '230311' if no argument is provided
const method = process.argv[3] || 'jimp'; // Default to 'jimp' if no argument is provided
const numColors = parseInt(process.argv[4] || '5', 10); // Default to 5 if no argument is provided

analyzeImagesInFolder(folderDate, method, numColors)
    .then(() => {
        console.log('Analysis completed successfully');
        sequelize.close();
    })
    .catch(error => {
        console.error('Error during analysis:', error);
        sequelize.close();
    });