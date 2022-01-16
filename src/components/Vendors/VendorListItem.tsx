import { IonCard, IonImg, IonRow, IonCol, IonGrid } from "@ionic/react";
import "./VendorListItem.css";

const VendorListItem: React.FC<{
  id: number;
  name: string;
  imagePath: string;
  longitude: number;
  latitude: number;
  description: string;
}> = (props) => {
  return (
    <IonGrid>
      <IonRow>
        <IonCol size="4">
          <IonRow>
            <IonImg
              className="vendor-image"
              src={props.imagePath}
              style={{ width: "100%" }}
            />
          </IonRow>
        </IonCol>
        <IonCol>
          <IonRow>
            <IonCol size="8">
              <IonRow>
                <h2>{props.name}</h2>
              </IonRow>
              <IonRow>
                <p>{props.description}</p>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default VendorListItem;
