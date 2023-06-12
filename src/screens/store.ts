// store.ts
import { create } from 'zustand';
import { DataService } from './DataService';
import { UrlService } from './UrlService';

const dataService = new DataService();
const urlService = new UrlService();

export interface GridHeaderData {
  title: string;
  description: string;
  imageUrl: string;
}

export interface ExhibitionHeaderData {
  date: string;
  number: string;
  seriesName: string;
}

export interface ImageObject {
    photoID: string;
    number: string;
    url: string;
    imagePath?: string;
    title: string;
    date: string;
    dateOriginal: string;
    index?: number;
    seriesName: string;
    seriesCode: string;
}

export interface Store {
  images: ImageObject[];
  sortedImages: ImageObject[];
  selectedImage: ImageObject | null;
  gridHeaderData: GridHeaderData | null;
  exhibitionHeaderData: ExhibitionHeaderData | null;
  initialLoad: boolean;
  loading: boolean; 
  initialImageFetch: boolean;
  setLoading: (loading: boolean) => void;
  setInitialLoad: (value: boolean) => void;
  setSelectedImage: (photoID: string | null) => void;
  setSortedImages: (images: ImageObject[]) => void;
  setGridHeaderData: (data: GridHeaderData) => void;
  setExhibitionHeaderData: (data: ExhibitionHeaderData) => void;
  fetchGridHeaderData: (filter: string) => Promise<GridHeaderData | null>;
  fetchExhibitionHeaderData: (filter: string) => Promise<void>;
  fetchImages: () => Promise<void>;
  sortValue: 'newest' | 'oldest' | 'random';
  setSortValue: (value: 'newest' | 'oldest' | 'random') => void;
}

// Define a separate function for sorting images
function sortImages(images: ImageObject[], sortValue: 'newest' | 'oldest' | 'random') {
  let sortedImages = [...images];

  if (sortValue === 'random') {
    for (let i = sortedImages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sortedImages[i], sortedImages[j]] = [sortedImages[j], sortedImages[i]];
    }
  } else if (sortValue === 'newest') {
    sortedImages.sort((a, b) => new Date(b.dateOriginal).getTime() - new Date(a.dateOriginal).getTime());
  } else if (sortValue === 'oldest') {
    sortedImages.sort((a, b) => new Date(a.dateOriginal).getTime() - new Date(b.dateOriginal).getTime());
  }

  return sortedImages;
}

const useStore = create<Store>((set, get) => ({
  images: [],
  sortedImages: [],
  selectedImage: null,
  loading: true,
  gridHeaderData: null,
  exhibitionHeaderData: null,
  initialLoad: true,
  sortValue: 'random',
  initialImageFetch: false,
  setLoading: (loading) => set({ loading }),
  setInitialLoad: (load: boolean) => set({ initialLoad: load }),
// Modify setSelectedImage to find the image based on photoID
setSelectedImage: (photoID: string | null) => {
  if (photoID !== null) {
    const selectedImage = get().images.find(image => image.photoID === photoID);
    set({ selectedImage });
  } else {
    set({ selectedImage: null });
  }
},
  setSortedImages: (images) => set({ sortedImages: images }),
  setGridHeaderData: (data) => set({ gridHeaderData: data }),
  setExhibitionHeaderData: (data) => set({ exhibitionHeaderData: data }),
  setSortValue: (value) => {
    const sortedImages = sortImages(get().images, value);
    set({ sortValue: value, sortedImages });
  },
  fetchGridHeaderData: async (filter) => {
    const data = await dataService.fetchGridHeaderData(filter);
    set({ gridHeaderData: data });
    return data;
  },
  fetchExhibitionHeaderData: async (photoID) => {
    const data = await dataService.getHeaderDataForImage(get().images, photoID);
    set({ exhibitionHeaderData: data });
  }, 
  fetchImages: async () => {
    set({ loading: true });
    
    // Parse the URL to get the filter and photoID
    const { filter: urlFilter, photoID } = urlService.parseUrl();
    
    // Fetch the images
    const fetchedImages = await dataService.fetchImages(urlFilter);
    console.log('Fetched images:', fetchedImages);
    console.log(fetchedImages.map(image => image.photoID));
    
    // Update the state with the new images
    set({ images: fetchedImages });
  
    // Sort the images by date and set the sortedImages in the store
    let sortedImages = sortImages(fetchedImages, get().sortValue);
  
    set({ sortedImages });
  
    // If there's a photoID in the URL, find the corresponding image and set it as the selected image
    if (photoID) {
      const selectedImage = fetchedImages.find(image => image.photoID === photoID);
      if (selectedImage) {
        set({ selectedImage });
      } else {
        console.error(`Could not find image with photoID: ${photoID}`);
      }
    }
  
    // Fetch the header data based on the new filter
    const headerData = await dataService.fetchGridHeaderData(urlFilter);
    set({ gridHeaderData: headerData });
    set({ initialImageFetch: true });
    set({ loading: false });
    
  },
}));
  
export default useStore;
