import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import Map from "./pages/map/Map";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Recipes from "./pages/recipes/Recipes";
import Profile from "./pages/profile/Profile";
import { AppContextProvider } from "./store/AppContext";
import { FilterContextProvider } from "./store/FiltersContext";
import Login from "./pages/login/Login";
import Vendors from "./pages/vendors/Vendors";
import ManageContent from "./pages/manageContent/ManageContent";
import MobileNav from "./components/Menu/MobileNav";
import { isPlatform } from "@ionic/react";
import Home from "./pages/landing/Home";

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <FilterContextProvider>
        <IonApp>
          <IonReactRouter>
            <IonSplitPane contentId="main" when="lg">
              <Menu />
              <IonRouterOutlet id="main">
                <Route path="/" exact={true}>
                  <Redirect to="/home" />
                </Route>
                <Route path="/login" exact={true}>
                  <Login />
                </Route>
                <Route path="/home" exact={true}>
                  <Home />
                </Route>
                <Route path="/recipes" exact={true}>
                  <Recipes />
                </Route>
                <Route path="/vendors" exact={true}>
                  <Vendors />
                </Route>
                <Route path="/manageContent" exact={true}>
                  <ManageContent />
                </Route>
                <Route path="/map" exact={true}>
                  <Map />
                </Route>
                <Route path="/profile" exact={true}>
                  <Profile />
                </Route>
              </IonRouterOutlet>
            </IonSplitPane>
            {isPlatform("mobile") && <MobileNav />}
          </IonReactRouter>
        </IonApp>
      </FilterContextProvider>
    </AppContextProvider>
  );
};

export default App;
