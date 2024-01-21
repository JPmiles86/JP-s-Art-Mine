// my-gallery/src/utils/sortPhotos.js

export function sortPhotos(unsortedPhotos, sortBy) {
    let sortedPhotos = [...unsortedPhotos];

    switch (sortBy) {
        case 'newest':
            sortedPhotos.sort((a, b) => new Date(b.dateOriginal).getTime() - new Date(a.dateOriginal).getTime());
            break;
        case 'oldest':
            sortedPhotos.sort((a, b) => new Date(a.dateOriginal).getTime() - new Date(b.dateOriginal).getTime());
            break;
        case 'random':
        default:
            // Random sorting logic
            for (let i = sortedPhotos.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [sortedPhotos[i], sortedPhotos[j]] = [sortedPhotos[j], sortedPhotos[i]];
            }
            break;
    }

    return sortedPhotos;
}