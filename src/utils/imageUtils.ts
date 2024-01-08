// imageUtils.ts

    interface ParsedSeriesInfo {
    seriesCode: string;
    seriesName: string;
  }
  
  export const parseSeriesInfo = (series: string): ParsedSeriesInfo => {
    const [seriesCode, seriesName] = series.split(' - ');
    
    return {
      seriesCode,
      seriesName,
    };
  };
  
  export async function imageUrlToDataUrl(url: string): Promise<string> {
    console.log("Entering imageUrlToDataUrl with URL:", url); // Log at the beginning
    return new Promise((resolve, reject) => {
      
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      
      img.onload = () => {
        console.log("Image loaded successfully"); // Log in the middle
        
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL();
          console.log("Successfully converted to Data URL:", dataUrl); // Log at the end
          resolve(dataUrl);
        } else {
          reject('Could not get 2D context');
        }
      };
      
      img.onerror = (error) => {
        console.log("Error loading image:", error); // Log error
        reject(error);
      };
      
      img.src = url;
    });
  }  