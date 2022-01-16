import Displayable from "./Displayable.interface";

export default interface Ingredient extends Displayable {
    id: number;
    name: string;
    imagePath: string;
}