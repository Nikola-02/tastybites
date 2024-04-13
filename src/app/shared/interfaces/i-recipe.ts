import { Ingredient } from 'src/app/shared/classes/ingredient.model';

export interface IRecipe {
  id: string;
  name: string;
  description: string;
  author: string;
  rating: number;
  rating_count: number;
  category: string;
  nutrition_facts: {
    calories: number;
    carbs: number;
    fat: number;
    protein: number;
    fiber: number;
    cholesterol: number;
    sodium: number;
  };
  ingredients: Ingredient[];
  times: {
    prep_time: number;
    cook_time: number;
    servings: number;
  };
  instructions: [];
  image: string;
  created_at: string;
}
