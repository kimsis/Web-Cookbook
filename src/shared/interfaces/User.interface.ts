import Displayable from "./Displayable.interface";
import Recipe from "./Recipe.interface"

export default interface User extends Displayable {
    id: number;
    fullName: string;
    email: string;
    JWTToken: string;
    isAdmin: boolean;
    recipes: Recipe[] | null;
    favourites: Recipe[] | null;
    expiry: number;
    imagePath: string;
}