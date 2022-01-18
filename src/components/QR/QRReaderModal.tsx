import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
} from "@ionic/react";
import React, { useState } from "react";
import QrReader from "react-qr-reader";
import ModalRecipeInfo from "../Recipes/ModalRecipeInfo";
import { chevronBackCircleOutline, heart } from "ionicons/icons";

const QRReaderModal: React.FC<{ cameraOpen: boolean }> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [recipeId, setRecipeId] = useState(0);
  const handleScan = (data: any) => {
    setRecipeId(data);
    console.log(data);
    if (data) setIsOpen(true);
  };
  const handleError = (err: any) => {
    console.log(err);
  };
  return (
    <div>
      <IonModal isOpen={isOpen} onDidDismiss={() => setRecipeId(0)}>
        <ModalRecipeInfo id={recipeId} setShowRecipeInfoModal={setRecipeId} />
      </IonModal>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      <h1 style={{ textAlign: "center", color: "black" }}>
        Scan a QR code to show the recipe
      </h1>
      <IonFab>
        <IonFabButton size="small" onClick={() => setIsOpen(false)}>
          <IonIcon
            style={{ fontSize: "32px" }}
            icon={chevronBackCircleOutline}
          />
        </IonFabButton>
      </IonFab>
    </div>
  );
};
export default QRReaderModal;
