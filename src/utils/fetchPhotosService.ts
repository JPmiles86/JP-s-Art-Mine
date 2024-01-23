// my-gallery/src/utils/fetchPhotosService.ts

import { determineFilter } from './determineFilterUtils';
import { Photograph } from './store';
import { fetchPhotosFromAPI } from './fetchPhotosFromAPI';
import { sortPhotos } from './sortPhotos';

export async function fetchPhotosService(
    setPhotosError: (error: string | null) => void,
    setLoadingPhotos: (loading: boolean) => void,
    setPhotos: (photos: Photograph[]) => void,
    setSortedPhotos: (sortedPhotos: Photograph[]) => void,
    setInitialPhotoFetch: (value: boolean) => void,
    currentFilter: string,
    sortValue: 'newest' | 'oldest' | 'random',
    initialPhotoFetch: boolean
) {
    console.log("fetchPhotosService called", { currentFilter, initialPhotoFetch });
    console.log("Before fetching photos", { currentFilter, initialPhotoFetch, sortValue });

    if (initialPhotoFetch) {
        console.log("Initial fetch of photos already completed.");
        return;
    }

    setLoadingPhotos(true); // Set loading state to true
    console.log("Loading photos set to true");

    try {
        const filterType = determineFilter(currentFilter);
        const fetchedPhotos = await fetchPhotosFromAPI(filterType, currentFilter);
        const sortedPhotos = sortPhotos(fetchedPhotos, sortValue);

        console.log("Fetched photos:", fetchedPhotos);
        console.log("Sorted photos:", sortedPhotos);

        setPhotos(fetchedPhotos);
        console.log("Photos set in store");

        setSortedPhotos(sortedPhotos);
        console.log("Sorted photos set in store", sortedPhotos);

        setInitialPhotoFetch(true);
        console.log("Initial photo fetch set to true");

    } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching photos:', error);
            setPhotosError(error.message); // Set error state
        }
    } finally {
        setLoadingPhotos(false); 
        console.log("Loading photos set to false");
    }
}
