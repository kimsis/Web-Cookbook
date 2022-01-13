import { createContext } from "react";
import User from "../shared/interfaces/User.interface";

let currentUser:User | null = null;

//let http:string | null = "https://i403375core.venus.fhict.nl/";
let http:string | null = "https://localhost:44377/";

const AppContext = createContext<{http: string | null, user: User | null}>({
    http: http,
    user: currentUser,
});

export const AppContextProvider: React.FC = (props) => {
    const context = {
        http: http,
        user: currentUser,
    };

    return  <AppContext.Provider value={context}>
        {props.children}
    </AppContext.Provider>
}

export default AppContext;