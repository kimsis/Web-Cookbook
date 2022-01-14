import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useContext, useState } from "react";
import "./ManageContent.css";
import AppContext from "../../store/AppContext";
import { useHistory } from "react-router";

const ManageContent: React.FC<{}> = (props) => {
  const appContext = useContext(AppContext);
  const history = useHistory();
  
  let user = localStorage.getItem("user");
  if(user != null) {
    appContext.user = JSON.parse(user);
  }
  
  if (appContext.user == null) {
    history.replace("/login");
  } else if (!appContext.user.type) {
    console.log(appContext.user);
    
    history.replace("/profile");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle> Manage Content </IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  );
};

export default ManageContent;
