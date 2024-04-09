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
    public nutrition_facts: object,
    public ingredients: Ingredient[],
    public times: object,
    public instructions: [],
    public image: string,
    public created_at: string
  ) {}
}
