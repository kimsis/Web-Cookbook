import React, { useState } from "react";
import LoginComponent from "../Login/LoginComponent";
import RegisterComponent from "../Register/RegisterComponent";
import { IonButton, IonContent, IonRow } from "@ionic/react";

const UserHandle: React.FC<{}> = () => {
  const [register, setRegister] = useState(false);
  const [value, setButtonValue] = useState("Not registered?");
  const handleChange = () => {
    setRegister(!register);
    if (register) {
      setButtonValue("Not Registered?");
    } else {
      setButtonValue("Login");
    }
  };

  return (
    <IonContent
      fullscreen
      class="ion-padding ion-align-items-end"
      style={{ alignSelf: "center" }}
    >
      {register ? <RegisterComponent /> : <LoginComponent />}
      <IonRow class="ion-justify-content-center">
        <IonButton className="button" fill="outline" onClick={handleChange}>
          {value}
        </IonButton>
      </IonRow>
    </IonContent>
  );
};
export default UserHandle;
