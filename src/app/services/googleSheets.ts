// Service to fetch data from Google Sheets
const SPREADSHEET_ID = '1pxOIesfv4LyxLpR8afXNR56S0z5Pgz9vZBUt1Nxph5c';

export interface BookLocation {
  id: string;
  title: string;
  address: string;
  lat?: number;
  lng?: number;
}

export async function fetchBooksFromSheet(): Promise<BookLocation[]> {
  try {
    // Using Google Sheets JSON API for public sheets
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json`;
    
    const response = await fetch(url);
    const text = await response.text();
    
    // Google returns JSONP, we need to extract the JSON
    const jsonText = text.substring(47, text.length - 2);
    const data = JSON.parse(jsonText);
    
    const books: BookLocation[] = [];
    
    // Process rows (skip header row at index 0)
    for (let i = 0; i < data.table.rows.length; i++) {
      const row = data.table.rows[i];
      const cells = row.c;
      
      // Column B (index 1) = Title
      // Column D (index 3) = Address
      if (cells && cells[1] && cells[3]) {
        const title = cells[1]?.v || '';
        const address = cells[3]?.v || '';
        
        if (title && address) {
          books.push({
            id: `book-${i}`,
            title: String(title),
            address: String(address),
          });
        }
      }
    }
    
    return books;
  } catch (error) {
    console.error('Error fetching books from Google Sheets:', error);
    return [];
  }
}

// Geocode an address to coordinates using Nominatim (OpenStreetMap)
export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'MakiBook/1.0', // Nominatim requires a User-Agent
      },
    });
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error geocoding address:', error);
    return null;
  }
}

// Add a small delay to avoid rate limiting
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
