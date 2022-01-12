import {Recipe} from "./Recipe.interface"

export interface User {
    JWTToken: string;
    id: number;
    fullName: string;
    email: string;
    type: string;
    recipes: Recipe[];
    favourites: string[]; //for now
}