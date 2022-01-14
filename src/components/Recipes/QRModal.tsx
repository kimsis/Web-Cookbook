import { IonImg } from "@ionic/react";
import React, { Dispatch, SetStateAction } from "react";

const QRModal: React.FC<{
  id: number;
  setShowQRModal: Dispatch<SetStateAction<number>>;
}> = (props) => {
  return (
    <IonImg
      src={
        "https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=http://www.partirecept.com/" +
        props.id
      }
    ></IonImg>
  );
};

export default QRModal;
