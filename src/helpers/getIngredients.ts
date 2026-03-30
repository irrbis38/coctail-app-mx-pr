import type { CocktailType } from '@/types/cocktail';

const MAX_INGREDIENTS = 15;

export function getIngredients(cocktail: CocktailType) {
  const items = [];

  for (let i = 1; i <= MAX_INGREDIENTS; i++) {
    const name = cocktail[`strIngredient${i}` as keyof CocktailType];
    const measure = cocktail[`strMeasure${i}` as keyof CocktailType];

    if (typeof name === 'string' && name) {
      items.push({
        name: name,
        measure: typeof measure === 'string' ? measure : '',
      });
    }
  }

  return items;
}
