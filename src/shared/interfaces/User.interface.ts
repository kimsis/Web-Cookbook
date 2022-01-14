import Recipe from "./Recipe.interface"

export default interface User {
    id: number;
    fullName: string;
    email: string;
    JWTToken: string;
    type: boolean;
    recipes: Recipe[];
    favourites: Recipe[];
    expiry: number;
}