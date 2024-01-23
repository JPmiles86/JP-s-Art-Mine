// my-gallery/src/utils/parseUrlService.ts

import useStore from './store';

export class parseUrlService {
  private setCurrentFilter: (filter: string) => void;
  private setSelectedPhoto: (photoID: string | null) => void;

  constructor() {
    const { setCurrentFilter, setSelectedPhoto } = useStore.getState();
    this.setCurrentFilter = setCurrentFilter;
    this.setSelectedPhoto = setSelectedPhoto;
  }

  parseUrl(path = window.location.pathname) {
    console.log("Parsing the URL:", path);
    const parts = path.split('/');
    const filter = parts[1] || '';
    const photoID = parts[2] || '';

    // Update the store with parsed values
    this.setCurrentFilter(filter);
    console.log("setCurrentFilter:", filter);
    if (photoID) {
      this.setSelectedPhoto(photoID);
      console.log("setSelectedPhoto:", photoID);
    }

    console.log("Parsed Filter:", filter, "PhotoID:", photoID);

    // Return parsed values for use in components
    return { filter, photoID };
  }
}
