import { IonButton, IonIcon, IonModal } from "@ionic/react";
import React, { useState } from "react";
import { qrCode } from "ionicons/icons";
import QRReaderModal from "./QRReaderModal";
const QRReader: React.FC<{}> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IonModal
        isOpen={isOpen}
        onDidDismiss={() => {
          setIsOpen(false);
        }}
      >
        <QRReaderModal cameraOpen={isOpen}></QRReaderModal>
      </IonModal>

      <IonButton shape="round" onClick={() => setIsOpen(true)}>
        <IonIcon icon={qrCode}></IonIcon>
      </IonButton>
    </>
  );
};
export default QRReader;
