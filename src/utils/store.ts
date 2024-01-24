// my-gallery/src/utils/store.ts
import { create } from 'zustand';
// import { DataService } from './DataService';
import { UrlService } from './UrlService';
import { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { LayoutSpecs } from '../Diptychs/LayoutSpecs';
import { diptychConfigurations } from '../Diptychs/diptychFabricConfigurations';

// const dataService = new DataService();
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

// Add this new interface for managing download URLs
export interface DownloadURLs {
  [diptychIdCode: string]: string;
}

// Add Frame interface
export interface Frame {
  id: number;
  frameType: string;
}

export interface DiptychSVG {
  id: number;
  DiptychId: number;
  fused: string;
  FrameId: string;
  aspectRatio: string;
  orientation: string;
  leftSide: string;
  leftRotation: string;
  rightSide: string;
  rightRotation: string;
  shapeInCenterEdge: string;
  shapeAtTopEdge: string;
  shapeCode: string;
  DiptychIdName: string;
  DiptychIdCode: string;
  DiptchId: string;
  imagePath: string;
  photoID: string;
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
  currentFilter: string;  
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
  downloadURLs: DownloadURLs;
  canvasRefs: Map<string, React.RefObject<HTMLCanvasElement>>;
  fabricCanvasRefs: Map<string, fabric.Canvas>;
  layoutSpecsMap: Map<string, LayoutSpecs>;
  diptychConfigurations: typeof diptychConfigurations;
  selectedDiptychIdCode: string | null;
  diptychSVGs: DiptychSVG[]; // Add a new state property to hold the diptych data
  isMerged: string;
  shapeCode: string;
  FrameId: number; 
  frames: Frame[];
  setIsMerged: (isMerged: string) => void;
  setShapeCode: (shapeCode: string) => void;
  setFrameId: (FrameId: number) => void;
  setSelectedDiptychIdCode: (diptychIdCode: string | null) => void;
  clearSelectedDiptychIdCode: () => void;
  setLayoutSpecs: (diptychIdCode: string, specs: LayoutSpecs) => void;
  setFabricCanvasRef: (diptychIdCode: string, canvas: fabric.Canvas) => void;
  clearFabricCanvasRef: (diptychIdCode: string) => void;
  setCanvasRef: (diptychIdCode: string, ref: React.RefObject<HTMLCanvasElement>) => void;
  clearCanvasRef: (diptychIdCode: string) => void;
  setDownloadURL: (diptychIdCode: string, url: string) => void;
  // setFrameId: (color: number | 'white' | 'black' | 'unframed') => void;
  clearPhotos: () => void;
  setPreviousFilter: (filter: string) => void;
  setSeriesFilter: (series: string) => void;
  setSelectedSeries: (series: string) => void;
  setLoading: (loading: boolean) => void;
  setCurrentFilter: (filter: string) => void;
  setInitialLoad: (value: boolean) => void;
  setPhotos: (photos: Photograph[]) => void;
  setInitialPhotoFetch: (value: boolean) => void;
  setSelectedPhoto: (photoID: string | null) => void;
  setSortedPhotos: (photos: Photograph[]) => void;
  setGridHeaderData: (data: GridHeaderData) => void;
  setExhibitionHeaderData: (data: ExhibitionHeaderData) => void;
  sortValue: 'newest' | 'oldest' | 'random';
  setSortValue: (value: 'newest' | 'oldest' | 'random') => void;
  loadMorePhotos: () => void;
  resetLoadIndex: () => void;
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
  // FrameId: 'white', 
  downloadURLs: {},
  canvasRefs: new Map(),
  fabricCanvasRefs: new Map(),
  layoutSpecsMap: new Map(),
  diptychConfigurations,
    setLayoutSpecs: (diptychIdCode, specs) => set(state => {
    console.log(`Before setting layout specs for ${diptychIdCode}`);
    const newMap = new Map(state.layoutSpecsMap);
    newMap.set(diptychIdCode, specs);
    console.log(`Setting layout specs for ${diptychIdCode}:`, specs);
    return { layoutSpecsMap: newMap };
  }),  
  selectedDiptychIdCode: null,
  diptychSVGs: [], // Initialize the state
  isMerged: 'Entangled', // default value
  shapeCode: 'CD', // default value
  FrameId: 1, // default value 'white'
   // Initialize frames state
   frames: [
    { id: 1, frameType: 'White' },
    { id: 2, frameType: 'Black' },
    { id: 3, frameType: 'Unframed' },
  ],
  currentFilter: '',
  setCurrentFilter: (filter: string) => set({ currentFilter: filter }),
  setIsMerged: (isMerged) => set({ isMerged }),
  setShapeCode: (shapeCode) => set({ shapeCode }),
  setFrameId: (FrameId) => set({ FrameId }), 
  setSelectedDiptychIdCode: (diptychIdCode) => {
      console.log(`Updating selectedDiptychIdCode to: ${diptychIdCode}`);
  set({ selectedDiptychIdCode: diptychIdCode });
  },
  clearSelectedDiptychIdCode: () => set({ selectedDiptychIdCode: null }),
  setFabricCanvasRef: (diptychIdCode, canvas) => set((state) => {
    const newRefs = new Map(state.fabricCanvasRefs);
    newRefs.set(diptychIdCode, canvas);
    return { fabricCanvasRefs: newRefs };
  }),  
  clearFabricCanvasRef: (diptychIdCode) => set((state) => {
    const newRefs = new Map(state.fabricCanvasRefs);
    newRefs.delete(diptychIdCode);
    return { fabricCanvasRefs: newRefs };
  }),
  setCanvasRef: (diptychIdCode, ref) => set((state) => {
    const newRefs = new Map(state.canvasRefs);
    newRefs.set(diptychIdCode, ref);
    return { canvasRefs: newRefs };
  }),
  clearCanvasRef: (diptychIdCode) => set((state) => {
    const newRefs = new Map(state.canvasRefs);
    newRefs.delete(diptychIdCode);
    return { canvasRefs: newRefs };
  }),
  setDownloadURL: (diptychIdCode: string, url: string) => {
    set((state) => ({
      downloadURLs: {
        ...state.downloadURLs,
        [diptychIdCode]: url,
      },
    }));
  },
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

setSelectedPhoto: (photoID: string | null) => {
  if (photoID !== null) {
    // Find the photo object that matches the photoID
    const selectedPhotoObject = get().photos.find((photo) => photo.photoID === photoID);
    
    if (selectedPhotoObject) {
      set({ selectedPhoto: selectedPhotoObject });
    } else {
      // If no matching photo is found, set selectedPhoto to null
      set({ selectedPhoto: null });
    }
  } else {
    set({ selectedPhoto: null });
  }
},
setPhotos: (photos: Photograph[]) => {
  const sortedPhotos = sortPhotos(photos, get().sortValue);
  set({ photos, sortedPhotos });
},
  setSortedPhotos: (sortedPhotos: Photograph[]) => {
    console.log("Setting sorted photos in store", sortedPhotos);
    set({ sortedPhotos });
  },
  
  setInitialPhotoFetch: (value: boolean) => set({ initialPhotoFetch: value }),
  setGridHeaderData: (data) => set({ gridHeaderData: data }),
  setExhibitionHeaderData: (data) => set({ exhibitionHeaderData: data }),
  // Update setSortValue to also update loadedPhotos based on the new sorting
  setSortValue: (value) => {
    const sortedPhotos = sortPhotos(get().photos, value);
    const firstSet = sortedPhotos.slice(0, 33); // Assuming 33 is your initial batch size
    set({ sortValue: value, sortedPhotos, loadedPhotos: firstSet, loadIndex: 33 });
  },
  resetLoadIndex: () => set((state) => {
    const firstSet = state.sortedPhotos.slice(0, 33); // Assuming 33 is your initial batch size
    return { loadIndex: 0, loadedPhotos: firstSet };
  }),

  loadMorePhotos: () => {
    const { loadIndex, sortedPhotos, loadedPhotos } = get();

    console.log("loadMorePhotos called", { loadIndex, sortedPhotosLength: sortedPhotos.length });

    if (loadIndex >= sortedPhotos.length) {
      console.log('All photos are loaded');
      return;
    }

    const newLoadIndex = loadIndex + 33; // Assuming 33 is the batch size
    const newLoadedPhotos = sortedPhotos.slice(0, newLoadIndex);
    set({ loadIndex: newLoadIndex, loadedPhotos: newLoadedPhotos });
  },

}));

export default useStore;