// my-gallery/src/utils/parseUrlService.ts

export class parseUrlService {
  parseUrl() {
    const path = window.location.pathname;
    const parts = path.split('/');
    return {
      filter: parts[1],
      photoID: parts[2] || '', // Ensure this is an empty string if undefined
    };
  }
}
