// my-gallery/src/utils/fetchAllSeries.ts

const BASE_API_URL = "http://localhost:4000/api";

export async function fetchAllSeries() {
  try {
    const response = await fetch(`${BASE_API_URL}/series`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const series = await response.json();
    return series;
  } catch (error) {
    console.error('Error fetching series:', error);
    return []; // Return empty array in case of error
  }
}
