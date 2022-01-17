import {
  IonContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
} from "@ionic/react";
import { useParams } from "react-router";
import "./VendorInfoModal.css";
import {
  star,
  starHalf,
  starOutline,
  time,
  megaphone,
  cellular,
  fastFood,
  earth,
  egg,
  timer,
} from "ionicons/icons";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Vendor from "../../shared/interfaces/Vendor.interface";
import axios, { AxiosResponse } from "axios";
import AppContext from "../../store/AppContext";

const VendorInfoModal: React.FC<{
  id: number;
  setShowVendorInfoModal: Dispatch<SetStateAction<number>>;
}> = (props) => {
  useEffect(() => {
    getData();
  }, []);

  const [vendor, setVendor] = useState<Vendor>();
  const appContext = useContext(AppContext);

  async function getData() {
    await axios(appContext.http + "Vendor/" + props.id)
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }

  function setData(data: AxiosResponse) {
    console.log(data);
    let vendorTest: Vendor = JSON.parse(JSON.stringify(data.data));
    setVendor(vendorTest);
    console.log(vendorTest);
  }

  function setError(error: any) {
    console.log(error);
  }

  const iconsStyling = { margin: "0px", marginRight: "8px" };
  return (
    <IonContent>
      <IonGrid style={{ padding: "10px", paddingTop: "50px" }}>
        <IonRow>
          <IonCol size="5">
            <IonImg src={vendor?.imagePath}></IonImg>
          </IonCol>
          <IonCol>
            <IonRow>
              <IonCol>
                <div>{vendor?.name}</div>
              </IonCol>
            </IonRow>
            <IonItem color="none" lines="none">
              <IonIcon icon={time} slot="start" style={iconsStyling} />
            </IonItem>
            <IonItem color="none" lines="none">
              <IonIcon icon={megaphone} slot="start" style={iconsStyling} />
            </IonItem>
            <IonItem color="none" lines="none">
              <IonIcon
                icon={cellular}
                color="warning"
                slot="start"
                style={iconsStyling}
              />
            </IonItem>
            <IonItem color="none" lines="none">
              <IonIcon icon={fastFood} slot="start" style={iconsStyling} />
            </IonItem>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <h1>More Details</h1>
            <IonItem color="none" lines="none">
              <IonIcon icon={earth} slot="start" style={iconsStyling} />
            </IonItem>
            <IonItem color="none" lines="none">
              <IonIcon icon={egg} slot="start" style={iconsStyling} />
            </IonItem>
            <IonItem color="none" lines="none">
              <IonIcon icon={timer} slot="start" style={iconsStyling} />
            </IonItem>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <h1>Ingredients</h1>
            {vendor?.ingredients.map((x) => (
              <IonChip>
                <IonLabel>{x}</IonLabel>
              </IonChip>
            ))}
          </IonCol>
        </IonRow>

        <IonRow>
          {/*
              Unnecessary
            <IonCol size="1">
              <IonButton color="warning" fill="outline">Delete</IonButton>
            </IonCol>
            <IonCol size="1" offset="8">
              <IonButton color="warning" fill="solid">Edit</IonButton>
            </IonCol>
              */}
          <IonCol>
            <IonButton
              color="warning"
              fill="outline"
              onClick={() => props.setShowVendorInfoModal(0)}
            >
              Close
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default VendorInfoModal;
