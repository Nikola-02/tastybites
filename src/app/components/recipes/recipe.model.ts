import { Ingredient } from 'src/app/shared/classes/ingredient.model';

export class Recipe {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public author: string,
    public rating: number,
    public rating_count: number,
    public category: string,
    public nutrition_facts: {
      calories: number;
      carbs: number;
      fat: number;
      protein: number;
      fiber: number;
      cholesterol: number;
      sodium: number;
    },
    public ingredients: Ingredient[],
    public times: {
      prep_time: number;
      cook_time: number;
      servings: number;
    },
    public instructions: [],
    public image: string,
    public created_at: string
  ) {}
}
