// DataService.ts
import { UrlService } from './UrlService';
import { ImageObject, GridHeaderData, ExhibitionHeaderData } from './store';

export class DataService {
  private urlService = new UrlService();

  async fetchImages(filter: string): Promise<ImageObject[]> {
    try {
        let dataUrl;
        const urlService = new UrlService();
        const filterUrl = urlService.determineFilter(filter);
    
        switch(filterUrl) {
          case 'date':
            dataUrl = `/api/photos/date/${filter}`;
            break;
          case 'number':
            dataUrl = `/api/photos/number/${filter}`;
            break;
          case 'series':
            dataUrl = `/api/photos/series/${filter}`;
            break;
          default:
            throw new Error(`Invalid filter: ${filterUrl}`);
        }
    
        // const fetchedImages = await fetch(dataUrl);
        const response = await fetch(dataUrl);
      const data = await response.json();
      // Sort the images in a consistent way
      data.sort((a: ImageObject, b: ImageObject) => Number(a.photoID) - Number(b.photoID));
      return data;
    } catch (error) {
      console.error('Error fetching images:', error);
      return []; // Return an empty array if an error occurs
    }
  }

  async fetchGridHeaderData(filter: string): Promise<GridHeaderData | null> {
    try {
          let dataUrl;
          const urlService = new UrlService();
          const filterUrl = urlService.determineFilter(filter);
      
          switch(filterUrl) {
            case 'date':
              dataUrl = `/api/dates/${filter}/header`;
              break;
            case 'number':
              dataUrl = `/api/numbers/${filter}/header`;
              break;
            case 'series':
              dataUrl = `/api/series/${filter}/header`;
              break;
            default:
              throw new Error(`Invalid filter: ${filterUrl}`);
          }
      
          const response = await fetch(dataUrl);
          const data = await response.json();
          return data;
    } catch (error) {
      console.error('Error fetching header data:', error);
      return null; // Return null if an error occurs
    }
  }

  getHeaderDataForImage(images: ImageObject[], photoID: string): ExhibitionHeaderData | null {
    const image = images.find(image => image.photoID === photoID);
    if (image) {
      return {
        date: image.date,
        number: image.number,
        seriesName: image.seriesName,
      };
    }
    return null;
  }
}