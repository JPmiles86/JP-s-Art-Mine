// DataService.ts
import { UrlService } from './UrlService';
import { Photograph, GridHeaderData, ExhibitionHeaderData } from './store';

export interface Series {
  seriesCode: string;
  seriesName: string;
  // other properties...
}

export class DataService {
  private urlService = new UrlService();

  async fetchPhotos(filter: string, series?: string): Promise<Photograph[]> {
    if (!filter) {
      throw new Error('Filter is undefined');
    }
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
  
  
      const response = await fetch(dataUrl);
      const data = await response.json();
      data.sort((a: Photograph, b: Photograph) => Number(a.photoID) - Number(b.photoID));
      return data;
    } catch (error) {
      console.error('Error fetching photos:', error);
      return [];
    }
  }
  
  async fetchAllSeries(): Promise<Series[]> {
    try {
      const response = await fetch('/api/series');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching series:', error);
      return [];
    }
  }
  
  async fetchGridHeaderData(filter: string): Promise<GridHeaderData | null> {
    if (!filter) {
      throw new Error('Filter is undefined');
    }  try {
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

  getHeaderDataForPhoto(photos: Photograph[], photoID: string): ExhibitionHeaderData | null {
    const photo = photos.find(photo => photo.photoID === photoID);
    if (photo) {
      return {
        date: photo.date,
        number: photo.number,
        seriesName: photo.seriesName,
      };
    }
    return null;
  }
}