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
    <IonCard>
      <IonGrid>
        <IonRow>
          <IonCol sizeLg="3" sizeSm="3" sizeMd="4">
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
              <IonCol sizeLg="9" sizeSm="9" sizeMd="8">
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
    </IonCard>
  );
};

export default VendorListItem;
