import {
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import {
  person,
  fastFoodOutline,
  fastFoodSharp,
  locationOutline,
  locationSharp,
  listOutline,
  listSharp,
  locateOutline,
  locateSharp,
  menuOutline,
  menuSharp,
} from "ionicons/icons";
import "./Menu.css";
import MenuItem from "./MenuItem";
import { useContext } from "react";
import AppContext from "../../store/AppContext";
import logo from "../../assets/logo.png";
export interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Profile",
    url: "/profile",
    iosIcon: person,
    mdIcon: person,
  },
  {
    title: "Recipes",
    url: "/recipes",
    iosIcon: fastFoodOutline,
    mdIcon: fastFoodSharp,
  },
  {
    title: "Vendors",
    url: "/vendors",
    iosIcon: locationOutline,
    mdIcon: locationSharp,
  },
  {
    title: "Map",
    url: "/map",
    iosIcon: locateOutline,
    mdIcon: locateSharp,
  },
  {
    title: "Manage Content",
    url: "/manageContent",
    iosIcon: listOutline,
    mdIcon: listSharp,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();
  const appContext = useContext(AppContext);

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="menu-list">
          <IonListHeader>
            <IonItem>
              <img src={logo} style={{ width: "13%" }} />
              <IonLabel>PartiRecept</IonLabel>
            </IonItem>
          </IonListHeader>
          {appPages.map((appPage, index) => {
            if (index !== appPages.length - 1) {
              return (
                <MenuItem
                  key={index}
                  index={index}
                  appPage={appPage}
                  pathname={location.pathname}
                />
              );
            } else if (appContext.user != null && appContext.user.type) {
              return (
                <MenuItem
                  key={index}
                  index={index}
                  appPage={appPage}
                  pathname={location.pathname}
                />
              );
            }
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
