export default interface Recipe {
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
    ingredients: string[];
    unlistedIngredients: string[];
    timeToCook: string;
    latitude: number;
    longitude: number;
}