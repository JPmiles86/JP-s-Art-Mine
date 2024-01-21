// my-gallery/src/utils/fetchPhotosFromAPI.js

const BASE_URL = "http://localhost:4000/api"; // Adjust as needed

export async function fetchPhotosFromAPI(filterType, filterValue) {
    let endpoint = "";
    switch (filterType) {
        case 'date':
            endpoint = `${BASE_URL}/photos/date/${filterValue}`;
            break;
        case 'number':
            endpoint = `${BASE_URL}/photos/number/${filterValue}`;
            break;
        case 'series':
            endpoint = `${BASE_URL}/photos/series/${filterValue}`;
            break;
        default:
            throw new Error('Invalid filter type');
    }

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const photos = await response.json();
        return photos;
    } catch (error) {
        console.error('Error fetching photos:', error);
        return []; // Return empty array in case of error
    }
}
