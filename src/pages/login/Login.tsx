import {
    IonButtons,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
  } from "@ionic/react";
  import React, { useContext, useState } from "react";
  import "./Login.css";
  import UserHandle from "../../components/Profile/UserHandle/UserHandle";
  import AppContext from "../../store/AppContext";
  import { useHistory } from "react-router";
  
  const Login: React.FC<{}> = (props) => {
    const appContext = useContext(AppContext);
    const history = useHistory();
  
    if (appContext.user != null || localStorage.getItem('user') != null) {
      history.replace("/profile");
    }
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle> Login </IonTitle>
          </IonToolbar>
        </IonHeader>
        <UserHandle />
      </IonPage>
    );
  };
  
  export default Login;
  