const API_URL = process.env.NEXT_PUBLIC_CAT_API_URL || "https://api.thecatapi.com/v1";
const API_KEY = process.env.NEXT_PUBLIC_CAT_API_KEY || "";

export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export async function fetchCats(page: number = 0, limit: number = 15): Promise<CatImage[]> {
  const res = await fetch(
    `${API_URL}/images/search?limit=${limit}&page=${page}&order=ASC`,
    {
      headers: {
        "x-api-key": API_KEY,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch cats");
  }

  return res.json();
}
