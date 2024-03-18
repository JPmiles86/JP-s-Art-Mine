// my-gallery/src/utils/fetchPhotosService.ts

import { determineFilter } from './determineFilterUtils';
import { Photograph } from './store';
import { fetchPhotosFromAPI } from './fetchPhotosFromAPI';

export async function fetchPhotosService(
    setPhotosError: (error: string | null) => void,
    setLoadingPhotos: (loading: boolean) => void,
    setPhotos: (photos: Photograph[]) => void,
    setInitialPhotoFetch: (value: boolean) => void,
    currentFilter: string,
    initialPhotoFetch: boolean,
    userRole: string | null
) {
    console.log("fetchPhotosService called", { currentFilter, initialPhotoFetch });
    console.log("Before fetching photos", { currentFilter, initialPhotoFetch });

    if (initialPhotoFetch) {
        console.log("Initial fetch of photos already completed.");
        return;
    }

    setLoadingPhotos(true); // Set loading state to true
    console.log("Loading photos set to true");

    try {
        const filterType = determineFilter(currentFilter);
        const fetchedPhotos = await fetchPhotosFromAPI(filterType, currentFilter, userRole);

        console.log("Fetched photos:", fetchedPhotos);

        setPhotos(fetchedPhotos); // This will trigger sorting in the store
        console.log("Photos set in store");

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
