// store.ts
import { create } from 'zustand';
import { DataService } from './DataService';
import { UrlService } from './UrlService';
import { DiptychSVG } from '../Diptychs/DiptychFilter';

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
  diptcyhName: string;
  artworkID: string;
}

export interface Store {
  photos: Photograph[];
  sortedPhotos: Photograph[];
  selectedPhoto: Photograph | null;
  gridHeaderData: GridHeaderData | null;
  exhibitionHeaderData: ExhibitionHeaderData | null;
  initialLoad: boolean;
  loading: boolean; 
  initialPhotoFetch: boolean;
  selectedSeries: string;
  seriesFilter: string;
  previousFilter: string;
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
  sortedPhotos: [],
  selectedPhoto: null,
  loading: false,
  gridHeaderData: null,
  exhibitionHeaderData: null,
  initialLoad: true,
  sortValue: 'random',
  initialPhotoFetch: false,
  selectedSeries: '',
  seriesFilter: '',
  previousFilter: '',
  clearPhotos: () => set({ sortedPhotos: [] }),
  setPreviousFilter: (filter: string) => set({ previousFilter: filter }),
  setSelectedSeries: (series) => set({ selectedSeries: series }),
  setLoading: (loading) => set({ loading }),
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
    set({ sortValue: value, sortedPhotos });
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
  set({ loading: true });
  
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

   // Sort the photos by date and set the sortedPhotos in the store
   let sortedPhotos = sortPhotos(fetchedPhotos, get().sortValue);

   set({ loading: false });
   set({ sortedPhotos });


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
  set({ loading: false });
},
}));

export default useStore;

