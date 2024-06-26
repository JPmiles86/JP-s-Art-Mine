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
    currentFilter: string, 
    pathSuffix: string = '' // New parameter
) => {
    const navigate = useNavigate();

    const navigateToPhoto = useCallback((photoIndex: number) => {
        const validIndex = (photoIndex + sortedPhotos.length) % sortedPhotos.length;
        const photo = sortedPhotos[validIndex];
        navigate(`/${currentFilter}/${photo.photoID}${pathSuffix}`);
    }, [sortedPhotos, navigate, currentFilter, pathSuffix]);

    const handlePrevPhoto = useCallback((currentIndex: number) => {
        navigateToPhoto((currentIndex - 1 + sortedPhotos.length) % sortedPhotos.length);
    }, [navigateToPhoto, sortedPhotos.length]);

    const handleNextPhoto = useCallback((currentIndex: number) => {
        navigateToPhoto((currentIndex + 1) % sortedPhotos.length);
    }, [navigateToPhoto, sortedPhotos.length]);

    return { handlePrevPhoto, handleNextPhoto };
};

export default useGalleryNavigation;