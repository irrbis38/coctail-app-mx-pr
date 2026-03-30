import type { CocktailType } from '@/types/cocktail'

export async function fetchCocktail(code: string): Promise<CocktailType[]> {
  try {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${code}`
    )

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const data = await response.json()
    return data.drinks || []
  } catch (error) {
    console.error(`Error for ${code}:`, error)
    throw error
  }
}
