import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import Map from "../../pages/map/Map";
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
import Recipes from "../../pages/recipes/Recipes";
import Profile from "../../pages/profile/Profile";
import Login from "../../pages/login/Login";
import Vendors from "../../pages/vendors/Vendors";
import ManageContent from "../../pages/manageContent/ManageContent";
import Register from "../../pages/register/Register";
import {
  personCircleOutline,
  fastFood,
  locateOutline,
  settings,
  locationSharp,
} from "ionicons/icons";

const MobileNav: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/manageContent" exact={true}>
          <ManageContent />
        </Route>
        <Route path="/recipes" exact={true}>
          <Recipes />
        </Route>
        <Route path="/profile" exact={true}>
          <Profile />
        </Route>
        <Route path="/vendors" exact={true}>
          <Vendors />
        </Route>
        <Route path="/login" exact={true}>
          <Login />
        </Route>
        <Route path="/register" exact={true}>
          <Register />
        </Route>
        <Route path="/map" exact={true}>
          <Map />
        </Route>
      </IonRouterOutlet>
      <IonTabBar color="primary" slot="bottom">
        <IonTabButton tab="recipes" href="/recipes">
          <IonIcon icon={fastFood} />
          <IonLabel>Recipes</IonLabel>
        </IonTabButton>
        <IonTabButton tab="map" href="/map">
          <IonIcon icon={locateOutline} />
          <IonLabel>Map</IonLabel>
        </IonTabButton>
        {/* <IonTabButton tab="manageContent" href="/manageContent">
          <IonIcon icon={settings} />
          <IonLabel>Content</IonLabel>
        </IonTabButton> */}
        <IonTabButton tab="vendor" href="/vendors">
          <IonIcon icon={locationSharp} />
          <IonLabel>Vendors</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/profile">
          <IonIcon icon={personCircleOutline} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MobileNav;
