import { IonPage } from "@ionic/react";
import React from "react";

import "./Home.css";

const Home: React.FC<{}> = () => {
  return (
    <IonPage>
      <div className="home-hero">
        <div className="home-container01">
          <h1 className="home-text">The flavours of Oud-Woensel</h1>
          <span className="home-text01">
            Explore the culture and cuisine of the region
          </span>
        </div>
      </div>
    </IonPage>
  );
};

export default Home;
