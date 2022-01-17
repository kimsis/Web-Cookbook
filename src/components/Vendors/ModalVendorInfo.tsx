import {
  IonContent,
  IonLabel,
  IonButton,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
} from "@ionic/react";
import "./ModalVendorInfo.css";
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

const ModalVendorInfo: React.FC<{
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
    let vendorTest: Vendor = JSON.parse(JSON.stringify(data.data));
    setVendor(vendorTest);
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
          <IonCol style={{ padding: "10px" }}>
            <IonRow>
              <h2>{vendor?.name}</h2>
            </IonRow>
            <IonRow>
              <p>{vendor?.description}</p>
            </IonRow>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <h1>Location</h1>
            {/* To-do */}
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

export default ModalVendorInfo;
