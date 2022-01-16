import Recipe from "./Recipe.interface";

export default interface Profile{
    favourites: Recipe[],
    id:number,
    name:string,
    profilePicUrl:string,
    recipes:[]
}