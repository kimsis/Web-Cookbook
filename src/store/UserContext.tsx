import { createContext } from "react";
import { Recipe } from "./RecipesContext";

export interface User {
    id: number;
    fullName: string;
    email: string;
    type: string;
    recipes: Recipe[];
    favourites: string[]; //for now
}

let dummyUser:User | null = (
    {
        id: 4,
        fullName: "Dimitar Hristov",
        email: "d.hristov@student.fontys.nl",
        type: "admin",
        recipes: [{
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
        }],
        favourites: [],
    }
)

function setUser(user: User | null) {
    dummyUser = user;
    console.log(user);
    
}

const UserContext = createContext<{user: User | null, setUser: (user:User | null) => void}>({
    user: dummyUser,
    setUser: setUser
});

export const UserContextProvider: React.FC = (props) => {
    const context = {
        user: dummyUser,
        setUser: setUser,
    };

    return  <UserContext.Provider value={context}>
        {props.children}
    </UserContext.Provider>
}

export default UserContext;