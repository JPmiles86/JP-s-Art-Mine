// my-gallery/src/utils/UrlService.ts
export class UrlService {
    parseUrl() {
      const path = window.location.pathname;
      const parts = path.split('/');
      return {
        filter: parts[1],
        photoID: parts[2] || '', // Ensure this is an empty string if undefined
      };
    }
  
    determineFilter(filter: string) {
        console.log(`Filter: ${filter}`);
        let filterUrl = '';
        if (filter.length === 6) {
          filterUrl = 'date';
        } else if (filter.length <= 3) {
          filterUrl = 'series';
        } else {
          filterUrl = 'number';
        }
        return filterUrl;
    }
  }