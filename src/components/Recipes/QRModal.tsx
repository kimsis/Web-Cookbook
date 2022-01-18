import { IonFab, IonFabButton, IonGrid, IonIcon, IonImg } from "@ionic/react";
import { chevronBackCircleOutline } from "ionicons/icons";
import React, { Dispatch, SetStateAction } from "react";

const QRModal: React.FC<{
  id: number;
  setShowQRModal: Dispatch<SetStateAction<number>>;
}> = (props) => {
  return (
    <IonGrid style={{ margin: 0 }}>
      <IonFab>
        <IonFabButton onClick={() => props.setShowQRModal(0)}>
          <IonIcon
            style={{ fontSize: "32px" }}
            icon={chevronBackCircleOutline}
          />
        </IonFabButton>
      </IonFab>
      <IonImg
        src={
          "https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=http://www.partirecept.com/" +
          props.id
        }
      ></IonImg>
    </IonGrid>
  );
};

export default QRModal;
