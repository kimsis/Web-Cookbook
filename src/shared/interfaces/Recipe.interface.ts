import Displayable from "./Displayable.interface";
import Ingredient from "./Ingredient.interface";

export default interface Recipe extends Displayable
 {
    id: number;
    title: string;
    sharedBy: {id: number, name: string};
    difficulty: number;
    type: string;
    instructions: string;
    countryOfOrigin: string;
    numberOfServings: string;
    preparationTimeTicks: number;
    rating: number;
    imagePath: string;
    ingredients: Ingredient[];
    unlistedIngredients: string[];
    cookingTimeTicks: number;
    latitude: number;
    longitude: number;
    approved: boolean;
    favouritedCount:number;
}