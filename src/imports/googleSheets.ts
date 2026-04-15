import type { BookLocation } from "../data/streetData";

const SHEET_ID = "1pxOIesfv4LyxLpR8afXNR56S0z5Pgz9vZBUt1Nxph5c";
const GID = "0";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

// Coordinates for Sant Andreu addresses based on actual street locations in Barcelona
// These are approximate real-world coordinates for these streets
const addressToCoords: Record<string, { lat: number; lng: number }> = {
  // Main streets
  "carrer gran de sant andreu": { lat: 41.4355, lng: 2.1895 },
  "gran de sant andreu": { lat: 41.4355, lng: 2.1895 },
  "passeig de santa coloma": { lat: 41.4340, lng: 2.1920 },
  "santa coloma": { lat: 41.4340, lng: 2.1920 },

  // North area
  "carrer de joan torras": { lat: 41.4378, lng: 2.1892 },
  "joan torras": { lat: 41.4378, lng: 2.1892 },
  "carrer de fabra i puig": { lat: 41.4365, lng: 2.1880 },
  "fabra i puig": { lat: 41.4365, lng: 2.1880 },
  "carrer de sant adria": { lat: 41.4372, lng: 2.1905 },
  "sant adria": { lat: 41.4372, lng: 2.1905 },

  // Central area
  "carrer de pere iv": { lat: 41.4350, lng: 2.1900 },
  "pere iv": { lat: 41.4350, lng: 2.1900 },
  "carrer de segre": { lat: 41.4348, lng: 2.1885 },
  "segre": { lat: 41.4348, lng: 2.1885 },
  "carrer de ribes": { lat: 41.4358, lng: 2.1908 },
  "ribes": { lat: 41.4358, lng: 2.1908 },
  "carrer de tunisia": { lat: 41.4362, lng: 2.1898 },
  "tunisia": { lat: 41.4362, lng: 2.1898 },

  // Southeast area
  "carrer de l'estadella": { lat: 41.4340, lng: 2.1915 },
  "estadella": { lat: 41.4340, lng: 2.1915 },
  "carrer de concepcion arenal": { lat: 41.4342, lng: 2.1895 },
  "concepcion arenal": { lat: 41.4342, lng: 2.1895 },
  "carrer de bolivia": { lat: 41.4345, lng: 2.1910 },
  "bolivia": { lat: 41.4345, lng: 2.1910 },

  // West area
  "carrer de guatemala": { lat: 41.4352, lng: 2.1870 },
  "guatemala": { lat: 41.4352, lng: 2.1870 },
  "carrer de potosi": { lat: 41.4360, lng: 2.1875 },
  "potosi": { lat: 41.4360, lng: 2.1875 },
  "carrer del clot": { lat: 41.4368, lng: 2.1865 },
  "clot": { lat: 41.4368, lng: 2.1865 },

  // East area
  "carrer de la sagrera": { lat: 41.4358, lng: 2.1925 },
  "sagrera": { lat: 41.4358, lng: 2.1925 },
  "carrer de felipe ii": { lat: 41.4348, lng: 2.1930 },
  "felipe ii": { lat: 41.4348, lng: 2.1930 },
  "carrer de valladolid": { lat: 41.4355, lng: 2.1918 },
  "valladolid": { lat: 41.4355, lng: 2.1918 },
};

// Normalize text for address matching
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/\s+/g, " ") // Normalize spaces
    .replace(/[^\w\s]/g, ""); // Remove special characters
};

// Get coordinates for an address in Sant Andreu (exported for use in components)
export const getCoordinatesForAddress = (address: string, index: number = 0): { lat: number; lng: number } => {
  const normalizedAddress = normalizeText(address);

  // Try exact match first
  if (addressToCoords[normalizedAddress]) {
    return addressToCoords[normalizedAddress];
  }

  // Try to find a match by checking if the street name is contained
  for (const [key, coords] of Object.entries(addressToCoords)) {
    const normalizedKey = normalizeText(key);

    // Check for substring matches in both directions
    if (normalizedAddress.includes(normalizedKey) || normalizedKey.includes(normalizedAddress)) {
      return coords;
    }

    // Check for word-level matches (more flexible)
    const addressWords = normalizedAddress.split(" ");
    const keyWords = normalizedKey.split(" ");

    // If most significant words match, consider it a match
    const significantMatches = keyWords.filter(word =>
      word.length > 3 && addressWords.some(aw => aw.includes(word) || word.includes(aw))
    );

    if (significantMatches.length >= Math.min(2, keyWords.length)) {
      return coords;
    }
  }

  // If no match, generate coordinates in Sant Andreu area with offset
  // This spreads unknown locations across the map
  return {
    lat: 41.4350 + (index * 0.0015),
    lng: 2.1890 + (index * 0.0015),
  };
};

// Default image for locations
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1652946337021-2ba5ca96c36c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJjZWxvbmElMjBzdHJlZXQlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzczODQwOTE0fDA&ixlib=rb-4.1.0&q=80&w=1080";

export async function fetchGoogleSheetsData(signal?: AbortSignal): Promise<BookLocation[]> {
  try {
    const response = await fetch(CSV_URL, { signal });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const csvText = await response.text();
    const lines = csvText.split('\n').filter(line => line.trim());

    // Skip header row
    const dataLines = lines.slice(1);

    const locations: BookLocation[] = dataLines.map((line, index) => {
      // Parse CSV line (simple parsing, doesn't handle quoted commas)
      const columns = line.split(',').map(col => col.trim().replace(/^"|"$/g, ''));

      const codigo = columns[0] || `LOC${index + 1}`;
      const titulo = columns[1] || "";
      const estado = columns[2] || "0";
      const direccion = columns[3] || "Sant Andreu";
      const descripcion = columns[4] || "";

      const coords = getCoordinatesForAddress(direccion, index);

      return {
        id: index + 1,
        street: direccion,
        lat: coords.lat,
        lng: coords.lng,
        imageUrl: DEFAULT_IMAGE,
        hasBook: estado === "1",
        bookTitle: titulo,
        bookCode: codigo,
        bookSummary: descripcion,
      };
    });

    return locations;
  } catch (error) {
    console.error("Error fetching Google Sheets data:", error);
    return [];
  }
}
