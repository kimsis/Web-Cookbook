import { createContext } from "react";
import User from "../shared/interfaces/User.interface";

let currentUser: User | null = null;

let http: string | null = "https://i403375core.venus.fhict.nl/";
//let http:string | null = "https://localhost:44377/";

const AppContext = createContext<{ http: string | null; user: User | null }>({
  http: http,
  user: currentUser,
});

function getUser(): User | null {
  let userString = localStorage.getItem("user");
  if (userString != null) {
    let user = JSON.parse(userString);
    if (user.expiry < new Date().getTime()) {
      localStorage.clear();
      return null;
    } else {
      return JSON.parse(userString);
    }
  } else {
    return null;
  }
}

export const AppContextProvider: React.FC = (props) => {
  const context = {
    http: http,
    user: getUser(),
  };

  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
};

export default AppContext;
