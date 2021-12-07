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

let dummyUser:User = (
    {
        id: 4,
        fullName: "Example admin",
        email: "PRadmin@gmail.com",
        type: "admin",
        recipes: [],
        favourites: [],
    }
)

function setUser(user: User) {
    dummyUser = user;
    console.log(user);
    
}

const UserContext = createContext({
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