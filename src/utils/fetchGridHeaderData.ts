// my-gallery/src/utils/fetchGridHeaderData.ts
import { determineFilter } from './determineFilterUtils';

const BASE_API_URL = "http://localhost:4000/api";

export async function fetchGridHeaderData(filter: string) {
  if (!filter) {
    throw new Error('Filter is undefined');
  }

  let dataUrl;
  const filterUrl = determineFilter(filter); // Assuming determineFilter is imported

  switch(filterUrl) {
    case 'date':
      dataUrl = `${BASE_API_URL}/dates/${filter}/header`;
      break;
    case 'number':
      dataUrl = `${BASE_API_URL}/numbers/${filter}/header`;
      break;
    case 'series':
      dataUrl = `${BASE_API_URL}/series/${filter}/header`;
      break;
    default:
      throw new Error(`Invalid filter: ${filterUrl}`);
  }

  try {
    const response = await fetch(dataUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching header data:', error);
    return null; // Return null if an error occurs
  }
}
