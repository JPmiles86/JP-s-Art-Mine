//my-gallery/scripts/analyzeImageColors.js

const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');
const sequelize = require('../config/database');
const Photo = require('../models/Photo');
const PhotoColor = require('../models/PhotoColor');

// Define broad color categories
const colorCategories = {
    red: [345, 15],     // Expanded red range
    orange: [15, 45],   // Adjusted orange range
    yellow: [45, 70],
    green: [70, 170],
    blue: [170, 260],
    purple: [260, 315],
    pink: [315, 345],   // Adjusted pink range
    white: null,
    grey: null,
    black: null
};

// Representative colors for each category
const categoryColors = {
    red: "#FF0000",
    orange: "#FFA500",
    yellow: "#FFFF00",
    green: "#008000",
    blue: "#0000FF",
    purple: "#800080",
    pink: "#FFC0CB",
    white: "#FFFFFF",
    grey: "#808080",
    black: "#000000",
    other: "#CCCCCC"
};

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h * 360, s * 100, l * 100];
}

function categorizeColor(r, g, b) {
    const [h, s, l] = rgbToHsl(r, g, b);

    if (l <= 10) return 'black';
    if (l >= 90) return 'white';
    if (s <= 10) return 'grey';

    for (const [category, range] of Object.entries(colorCategories)) {
        if (range) {
            if (range[0] <= range[1] && h >= range[0] && h < range[1]) return category;
            if (range[0] > range[1] && (h >= range[0] || h < range[1])) return category;
        }
    }

    return 'other';
}

function classifyBrightness(lightness) {
    if (lightness < 40) return 'dark';
    if (lightness > 60) return 'light';
    return 'mid';
}

function classifyColorfulness(saturation) {
    return saturation > 50 ? 'colorful' : 'muted';
}

async function analyzeImage(imagePath) {
    const image = await Jimp.read(imagePath);
    const width = image.getWidth();
    const height = image.getHeight();
    const colorCounts = {};
    const totalPixels = width * height;
    let totalLightness = 0;
    let totalSaturation = 0;

    image.scan(0, 0, width, height, function(x, y, idx) {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];
        const [h, s, l] = rgbToHsl(r, g, b);
        const category = categorizeColor(r, g, b);
        colorCounts[category] = (colorCounts[category] || 0) + 1;
        totalLightness += l;
        totalSaturation += s;
    });

    const averageLightness = totalLightness / totalPixels;
    const averageSaturation = totalSaturation / totalPixels;

    const colors = Object.entries(colorCounts)
        .map(([category, count]) => ({
            category,
            percentage: (count / totalPixels) * 100
        }))
        .sort((a, b) => b.percentage - a.percentage);

    const result = colors.map((color, index) => ({
        hex: categoryColors[color.category],
        red: parseInt(categoryColors[color.category].substr(1, 2), 16),
        green: parseInt(categoryColors[color.category].substr(3, 2), 16),
        blue: parseInt(categoryColors[color.category].substr(5, 2), 16),
        rank: index + 1,
        percentage: parseFloat(color.percentage.toFixed(2)),
        category: color.category
    }));

    return {
        colors: result,
        brightness: parseFloat(averageLightness.toFixed(2)),
        colorfulness: parseFloat(averageSaturation.toFixed(2))
    };
}


async function analyzeImagesInFolder(folderDate) {
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
            console.log(`Analyzing ${file}`);
            const analysis = await analyzeImage(imagePath);
            const photo = await Photo.findOne({ where: { photoID: photoId } });
            
            if (photo) {
                await PhotoColor.upsert({
                    photoId: photo.photoID,
                    colors: analysis.colors,
                    brightness: analysis.brightness,
                    colorfulness: analysis.colorfulness
                });
                
                console.log(`Created/Updated PhotoColor record for ${photo.photoID}`);
                console.log(JSON.stringify(analysis, null, 2));
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

const folderDate = process.argv[2] || '230311';

analyzeImagesInFolder(folderDate)
    .then(() => {
        console.log('Analysis completed successfully');
        sequelize.close();
    })
    .catch(error => {
        console.error('Error during analysis:', error);
        sequelize.close();
    });