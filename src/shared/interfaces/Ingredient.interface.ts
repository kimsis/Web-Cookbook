import Displayable from "./Displayable.interface";
import Vendor from "./Vendor.interface";

export default interface Ingredient extends Displayable {
    id: number;
    name: string;
    imagePath: string;
    vendors: Vendor[];
}