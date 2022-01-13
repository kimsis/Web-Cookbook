import Recipe from "./Recipe.interface"

export default interface User {
    JWTToken: string;
    id: number;
    fullName: string;
    email: string;
    type: string;
    recipes: Recipe[];
    favourites: Recipe[];
}