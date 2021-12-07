import { createContext, useMemo, useState } from "react";


export interface Recipe {
    id: number;
    title: string;
    sharedBy: string;
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
}

let dummyRecipes:Recipe[] = ([
    {
        id: 1,
        title: "Swedish Meatballs",
        sharedBy: "Elise Bauer",
        difficulty: 3,
        type: "Meatballs",
        instructions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mauris nibh, ultricies eget pulvinar sit amet, pharetra non ipsum. Donec ipsum tellus, pharetra vitae efficitur nec, vestibulum ac justo. Maecenas porta consequat odio, et rutrum nisi. Sed aliquet eget neque molestie vehicula. Quisque ultrices imperdiet tincidunt. Donec fermentum pellentesque massa, at malesuada est. Fusce a elit in nibh suscipit pellentesque. Phasellus leo sapien, scelerisque sed egestas in, ullamcorper vitae tellus.",
        countryOfOrigin: "Sweden",
        numberOfServings: "4 to 6 servings",
        preparationTimeTicks: 20,
        imagePath: "https://api.time.com/wp-content/uploads/2018/05/swedish-meatballs-turkey.jpg",
        ingredients: ["1 tablespoon butter", "1/2 large onion", "1/4 cup milk", "3 slices bread", "1 large egg", "3/4 pound ground beef", "1/2 pound ground pork", "1 teaspoon kosher salt", "1 teaspoon black pepper", "1/2 teaspoon freshly grated nutmeg", "1/2 teaspoon ground cardamom"],
        unlistedIngredients: ["salt or smthn"],
        rating: 4.5,
        timeToCook: "80 min",
    },
    {
        id: 2,
        title: "Not-Swedish Meatballs",
        sharedBy: "Someone Else",
        difficulty: 1,
        type: "Meatball",
        instructions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mauris nibh, ultricies eget pulvinar sit amet, pharetra non ipsum. Donec ipsum tellus, pharetra vitae efficitur nec, vestibulum ac justo. Maecenas porta consequat odio, et rutrum nisi. Sed aliquet eget neque molestie vehicula. Quisque ultrices imperdiet tincidunt. Donec fermentum pellentesque massa, at malesuada est. Fusce a elit in nibh suscipit pellentesque. Phasellus leo sapien, scelerisque sed egestas in, ullamcorper vitae tellus.",
        countryOfOrigin: "Not-Sweden",
        numberOfServings: "4 to 6 servings",
        preparationTimeTicks: 10,
        imagePath: "https://api.time.com/wp-content/uploads/2018/05/swedish-meatballs-turkey.jpg",
        ingredients: ["1 tablespoon butter", "1/2 large onion", "1/4 cup milk", "3 slices bread", "1 large egg", "3/4 pound ground beef", "1/2 pound ground pork", "1 teaspoon kosher salt", "1 teaspoon black pepper", "1/2 teaspoon freshly grated nutmeg", "1/2 teaspoon ground cardamom"],
        unlistedIngredients: ["nothing"],
        rating: 4.0,
        timeToCook: "20 min",
    },
    {
        id: 3,
        title: "Mistery Meat",
        sharedBy: "The Chef",
        difficulty: 4,
        type: "Mistery",
        instructions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mauris nibh, ultricies eget pulvinar sit amet, pharetra non ipsum. Donec ipsum tellus, pharetra vitae efficitur nec, vestibulum ac justo. Maecenas porta consequat odio, et rutrum nisi. Sed aliquet eget neque molestie vehicula. Quisque ultrices imperdiet tincidunt. Donec fermentum pellentesque massa, at malesuada est. Fusce a elit in nibh suscipit pellentesque. Phasellus leo sapien, scelerisque sed egestas in, ullamcorper vitae tellus.",
        countryOfOrigin: "????",
        numberOfServings: "1 serving",
        preparationTimeTicks: 15,
        imagePath: "https://api.time.com/wp-content/uploads/2018/05/swedish-meatballs-turkey.jpg",
        ingredients: ["1 tablespoon butter", "1/2 large onion", "1/4 cup milk", "3 slices bread", "1 large egg", "3/4 pound ground beef", "1/2 pound ground pork", "1 teaspoon kosher salt", "1 teaspoon black pepper", "1/2 teaspoon freshly grated nutmeg", "1/2 teaspoon ground cardamom"],
        unlistedIngredients: ["yes"],
        rating: 5,
        timeToCook: "5? min",
    },
    {
        id: 4,
        title: "Mistery Meat",
        sharedBy: "The Chef",
        difficulty: 4,
        type: "Mistery",
        instructions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mauris nibh, ultricies eget pulvinar sit amet, pharetra non ipsum. Donec ipsum tellus, pharetra vitae efficitur nec, vestibulum ac justo. Maecenas porta consequat odio, et rutrum nisi. Sed aliquet eget neque molestie vehicula. Quisque ultrices imperdiet tincidunt. Donec fermentum pellentesque massa, at malesuada est. Fusce a elit in nibh suscipit pellentesque. Phasellus leo sapien, scelerisque sed egestas in, ullamcorper vitae tellus.",
        countryOfOrigin: "????",
        numberOfServings: "1 serving",
        preparationTimeTicks: 15,
        imagePath: "https://api.time.com/wp-content/uploads/2018/05/swedish-meatballs-turkey.jpg",
        ingredients: ["1 tablespoon butter", "1/2 large onion", "1/4 cup milk", "3 slices bread", "1 large egg", "3/4 pound ground beef", "1/2 pound ground pork", "1 teaspoon kosher salt", "1 teaspoon black pepper", "1/2 teaspoon freshly grated nutmeg", "1/2 teaspoon ground cardamom"],
        unlistedIngredients: ["yes"],
        rating: 5,
        timeToCook: "5? min",
    },
])

function setRecipes(recipes: Recipe[]) {
    dummyRecipes = recipes;
    console.log(recipes);
    
}

const RecipesContext = createContext({
    recipes: dummyRecipes,
    setRecipes: setRecipes
});

export const RecipesContextProvider: React.FC = (props) => {
    const context = {
        recipes: dummyRecipes,
        setRecipes: setRecipes,

    };

    return  <RecipesContext.Provider value={context}>
        {props.children}
    </RecipesContext.Provider>
}

export default RecipesContext;