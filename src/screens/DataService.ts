// DataService.ts
import { UrlService } from './UrlService';
import { Photograph, GridHeaderData, ExhibitionHeaderData } from './store';

export interface Series {
  seriesCode: string;
  seriesName: string;
  // other properties...
}

export interface DiptychSVG {
  fusedOrEntangled: string;
  leftSide: string;
  rightSide: string;
  leftRotation: string;
  rightRotation: string;
  shapeInCenterEdge: string;
  shapeAtTopEdge: string;
  DiptychIdCode: string;
  DiptychIdName: string;
  // other properties...
}

interface PhotoDetailsCache {
  [photoId: string]: Photograph | undefined;
}

interface PhotosBySeriesCache {
  [seriesCode: string]: Photograph[] | undefined;
}

export class DataService {
  private urlService = new UrlService();
  private photoDetailsCache: PhotoDetailsCache = {};
  private photosBySeriesCache: PhotosBySeriesCache = {};


  async fetchPhotos(filter: string, series?: string): Promise<Photograph[]> {
    // Use the series code as the cache key if available
    const cacheKey = series || filter;
    
    // Return cached photos if available
    if (this.photosBySeriesCache[cacheKey]) {
      return this.photosBySeriesCache[cacheKey]!;
    }

    // If not in the cache, fetch from the API
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
      this.photosBySeriesCache[cacheKey] = data; // Cache the result
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
  
   // fetchPhotoDetails method inside the DataService class
   async fetchPhotoDetails(photoId: string): Promise<Photograph | null> {
    // Check the cache first
    const cachedPhoto = this.photoDetailsCache[photoId];
    if (cachedPhoto !== undefined) { // explicitly check for undefined
      return cachedPhoto; // this will return null if cachedPhoto is null
    }
  
    // If not in the cache, fetch from the API
    try {
      const response = await fetch(`/api/photos/${photoId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json() as Photograph; // assert the correct type
      this.photoDetailsCache[photoId] = data; // cache the result
      return data;
    } catch (error) {
      console.error('Error fetching photo details:', error);
      return null; // explicitly return null on error
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

// Export an instance of DataService
export const dataService = new DataService();