// store.ts
import { create } from 'zustand';
import { DataService } from './DataService';
import { UrlService } from './UrlService';
import { DiptychSVG } from '../Diptychs/DiptychFilter';
import { useState, useEffect } from 'react';


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

export interface Photograph extends DiptychSVG {
  photoID: string;
  number: string;
  url: string;
  imagePath: string;
  title: string;
  date: string;
  dateOriginal: string;
  index?: number;
  seriesName: string;
  seriesCode: string;
  aspectRatio: string;
  DiptchId: string;
  FrameId: string;
  leftSide: string;
  leftRotation: string;
  rightSide: string;
  rightRotation: string;
  shapeInCenterEdge: string;
  shapeAtTopEdge: string;
  DiptychIdName: string;
  DiptychIdCode: string;
  diptcyhName: string;
  artworkID: string;
}

export interface Store {
  photos: Photograph[];
  loadedPhotos: Photograph[];
  loadIndex: number;
  sortedPhotos: Photograph[];
  selectedPhoto: Photograph | null;
  gridHeaderData: GridHeaderData | null;
  exhibitionHeaderData: ExhibitionHeaderData | null;
  initialLoad: boolean;
  initialPhotoFetch: boolean;
  selectedSeries: string;
  seriesFilter: string;
  previousFilter: string;
  loading: {
    photos: boolean;
    diptychSVG: boolean;
    diptychInfo: boolean;
    galleryBackground: boolean;
  };
  frameColor: 'white' | 'black' | 'unframed'; // add frameColor to the store
  setFrameColor: (color: 'white' | 'black' | 'unframed') => void; // add setFrameColor function to the store
  clearPhotos: () => void;
  setPreviousFilter: (filter: string) => void;
  setSeriesFilter: (series: string) => void;
  setSelectedSeries: (series: string) => void;
  setLoading: (loading: boolean) => void;
  setInitialLoad: (value: boolean) => void;
  setSelectedPhoto: (photoID: string | null) => void;
  setSortedPhotos: (photos: Photograph[]) => void;
  setGridHeaderData: (data: GridHeaderData) => void;
  setExhibitionHeaderData: (data: ExhibitionHeaderData) => void;
  fetchGridHeaderData: (filter: string) => Promise<GridHeaderData | null>;
  fetchExhibitionHeaderData: (filter: string) => Promise<void>;
  fetchPhotos: () => Promise<void>;
  sortValue: 'newest' | 'oldest' | 'random';
  setSortValue: (value: 'newest' | 'oldest' | 'random') => void;
  loadMorePhotos: () => void;
}

// Define a separate function for sorting photos
function sortPhotos(photos: Photograph[], sortValue: 'newest' | 'oldest' | 'random') {
  let sortedPhotos = [...photos];

  if (sortValue === 'random') {
    for (let i = sortedPhotos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sortedPhotos[i], sortedPhotos[j]] = [sortedPhotos[j], sortedPhotos[i]];
    }
  } else if (sortValue === 'newest') {
    sortedPhotos.sort((a, b) => new Date(b.dateOriginal).getTime() - new Date(a.dateOriginal).getTime());
  } else if (sortValue === 'oldest') {
    sortedPhotos.sort((a, b) => new Date(a.dateOriginal).getTime() - new Date(b.dateOriginal).getTime());
  }

  return sortedPhotos;
}

const useStore = create<Store>((set, get) => ({
  photos: [],
  loadedPhotos: [], // Initialized loadedPhotos to an empty array
  loadIndex: 0, // Initialized loadIndex to 0
  sortedPhotos: [],
  selectedPhoto: null,
  loading: {
    photos: false,
    diptychSVG: false,
    diptychInfo: false,
    galleryBackground: false,
  },
  gridHeaderData: null,
  exhibitionHeaderData: null,
  initialLoad: true,
  sortValue: 'random',
  initialPhotoFetch: false,
  selectedSeries: '',
  seriesFilter: '',
  previousFilter: '',
  frameColor: 'white', 
  setFrameColor: (color) => set({ frameColor: color }), 
  clearPhotos: () => set({ sortedPhotos: [] }),
  setPreviousFilter: (filter: string) => set({ previousFilter: filter }),
  setSelectedSeries: (series) => set({ selectedSeries: series }),
  setLoading: (loading: boolean) => set({ loading: { ...get().loading, photos: loading, diptychSVG: loading, diptychInfo: loading, galleryBackground: loading } }),
  setInitialLoad: (load: boolean) => set({ initialLoad: load }),
  setSeriesFilter: (series) => {
    console.log('setSeriesFilter called with:', series);
    console.log('Setting seriesFilter to:', series);
    if (!series) {
      console.error('Trying to set seriesFilter to undefined or null');
      console.trace();
    }
    set({ seriesFilter: series });
  },  
// Modify setSelectedPhoto to find the photo based on photoID
setSelectedPhoto: (photoID: string | null) => {
  if (photoID !== null) {
    const selectedPhoto = get().photos.find(photo => photo.photoID === photoID);
    set({ selectedPhoto });
  } else {
    set({ selectedPhoto: null });
  }
},
  setSortedPhotos: (photos) => set({ sortedPhotos: photos }),
  setGridHeaderData: (data) => set({ gridHeaderData: data }),
  setExhibitionHeaderData: (data) => set({ exhibitionHeaderData: data }),
  setSortValue: (value) => {
    const sortedPhotos = sortPhotos(get().photos, value);
    const firstSet = sortedPhotos.slice(0, 51); // Get the first set of sorted photos
    set({ sortValue: value, sortedPhotos, loadedPhotos: firstSet, loadIndex: 51 }); // Set the sorted photos, load the first set into loadedPhotos, and set loadIndex to 51
},
loadMorePhotos: () => {
  const currentLoadIndex = get().loadIndex;
  const sortedPhotosLength = get().sortedPhotos.length;

  // If all photos have already been loaded, don't try to load more
  if (currentLoadIndex >= sortedPhotosLength) {
    console.log('All photos are loaded');
    return;
  }

  const newLoadIndex = currentLoadIndex + 51;
  const newLoadedPhotos = get().sortedPhotos.slice(0, newLoadIndex);
  console.log('loadIndex:', newLoadIndex);
  console.log('loadedPhotos length:', newLoadedPhotos.length);
  console.log('sortedPhotos length:', sortedPhotosLength);
  set({ loadIndex: newLoadIndex, loadedPhotos: newLoadedPhotos });
},

  fetchGridHeaderData: async (filter) => {
    const data = await dataService.fetchGridHeaderData(filter);
    set({ gridHeaderData: data });
    return data;
  },
  fetchExhibitionHeaderData: async (photoID) => {
    const data = await dataService.getHeaderDataForPhoto(get().photos, photoID);
    set({ exhibitionHeaderData: data });
  }, 
fetchPhotos: async () => {
  console.log('fetchPhotos called');
  set({ loading: { ...get().loading, photos: true } });

  
  // Parse the URL to get the filter and photoID
  const { filter: urlFilter, photoID } = urlService.parseUrl();

  // If the seriesFilter state is empty or different from the URL, set it from the URL
  const seriesCodeFromUrl = window.location.pathname.split('/')[1];
  if (!get().seriesFilter || get().seriesFilter !== seriesCodeFromUrl) {
    set({ seriesFilter: seriesCodeFromUrl });
  }
  
  // Fetch the photos
const fetchedPhotos = await dataService.fetchPhotos(urlFilter, get().seriesFilter);
console.log('Fetched photos:', fetchedPhotos);
console.log(fetchedPhotos.map(photo => photo.photoID));

// Update the state with the new photos
set({ photos: fetchedPhotos });

// Sort the photos by date
let sortedPhotos = sortPhotos(fetchedPhotos, get().sortValue);

// Update the state with the sorted photos
set({ sortedPhotos });

// Mark the photos as loaded
set({ loading: { ...get().loading, photos: false } });

// After fetching and sorting all photos, load the first set
set((state) => {
  const firstSet = state.sortedPhotos.slice(0, 51);
  return { ...state, loadedPhotos: firstSet, loadIndex: 51 };
});

  // If there's a photoID in the URL, find the corresponding photo and set it as the selected photo
  if (photoID) {
    const selectedPhoto = fetchedPhotos.find(photo => photo.photoID === photoID);
    if (selectedPhoto) {
      set({ selectedPhoto });
    } else {
      console.error(`Could not find photo with photoID: ${photoID}`);
    }
  }

  // Fetch the header data based on the new filter
  const headerData = await dataService.fetchGridHeaderData(urlFilter);
  set({ gridHeaderData: headerData });
  set({ initialPhotoFetch: true });
  set({ loading: { ...get().loading, photos: false, diptychSVG: false, diptychInfo: false, galleryBackground: false } });
},
}));

export default useStore;

