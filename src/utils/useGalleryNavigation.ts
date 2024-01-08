// my-gallery/src/utils/useGalleryNavigation.ts
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface Photograph {
    photoID: string;
    number: string;
    url: string;
    imagePath?: string;
    aspectRatio: string;
    title: string;
    date: string;
    dateOriginal: string;
    index?: number;
    seriesName: string;
    seriesCode: string;
}

const useGalleryNavigation = (
    sortedPhotos: Photograph[], 
    setSelectedPhoto: (photoId: string) => void, 
    currentFilter: string, 
    pathSuffix: string = '' // New parameter
) => {
    const navigate = useNavigate();

    const navigateToPhoto = useCallback((photoIndex: number) => {
        if (photoIndex >= 0 && photoIndex < sortedPhotos.length) {
            const photo = sortedPhotos[photoIndex];
            setSelectedPhoto(photo.photoID);
            navigate(`/${currentFilter}/${photo.photoID}${pathSuffix}`); // Use pathSuffix here
        }
    }, [sortedPhotos, navigate, setSelectedPhoto, currentFilter, pathSuffix]);

    const handlePrevPhoto = useCallback((currentIndex: number) => {
        navigateToPhoto(currentIndex - 1);
    }, [navigateToPhoto]);

    const handleNextPhoto = useCallback((currentIndex: number) => {
        navigateToPhoto(currentIndex + 1);
    }, [navigateToPhoto]);

    return { handlePrevPhoto, handleNextPhoto };
};

export default useGalleryNavigation;
