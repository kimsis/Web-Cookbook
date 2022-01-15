import Displayable from "./Displayable.interface";

export default interface Vendor extends Displayable {
    id: number;
    name: string;
    imagePath: string;
}