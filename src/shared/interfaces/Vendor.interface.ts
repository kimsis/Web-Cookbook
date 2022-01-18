import Displayable from "./Displayable.interface";
import Ingredient from "./Ingredient.interface";

export default interface Vendor extends Displayable {
    id: number;
    name: string;
    imagePath: string;
    longitude: number;
    latitude: number;
    ingredients: {id:number, name:string,}[];
    description:string;
}