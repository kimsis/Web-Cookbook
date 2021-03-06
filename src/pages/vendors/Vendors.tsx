import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonModal,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import "./Vendors.css";
import AppContext from "../../store/AppContext";
import Vendor from "../../shared/interfaces/Vendor.interface";
import VendorListItem from "../../components/Vendors/VendorListItem";
import ModalCreateVendor from "../../components/Vendors/ModalVendor";
import ModalVendorInfo from "../../components/Vendors/ModalVendorInfo";

interface Data {
  page: number;
  size: number;
  items: Vendor[];
}

const Vendors: React.FC<{}> = (props) => {
  useEffect(() => {
    getData();
  }, []);
  const [showVendorCreateModal, setShowVendorCreateModal] = useState(0);
  const [showVendorInfoModal, setShowVendorInfoModal] = useState(0);
  const [vendors, setVendors] = useState<Vendor[] | null>();
  const appContext = useContext(AppContext);

  let vendorsArray: Data;
  async function getData() {
    await axios(appContext.http + "Vendor/PagedList")
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }

  function setData(data: AxiosResponse) {
    vendorsArray = JSON.parse(JSON.stringify(data.data));
    setVendors(vendorsArray.items);
  }

  function setError(error: any) {
    console.log(error);
  }

  let VendorList;
  if (vendors != null) {
    VendorList = vendors.map((vendor) => (
      <div
        className="vendor-list"
        key={vendor.id}
        onClick={() => setShowVendorInfoModal(vendor.id)}
      >
        <VendorListItem
          id={vendor.id}
          name={vendor.name}
          imagePath={vendor.imagePath}
          latitude={vendor.latitude}
          longitude={vendor.longitude}
          description={vendor.description}
        />
      </div>
    ));
  } else {
    VendorList = <div> No vendors found! </div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {/* <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons> */}
          <IonTitle>Explore Vendors</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonModal
          isOpen={showVendorCreateModal === 0 ? false : true}
          onDidDismiss={() => setShowVendorCreateModal(0)}
        >
          <ModalCreateVendor
            showVendorCreateModal={showVendorCreateModal}
            setShowVendorCreateModal={setShowVendorCreateModal}
          />
        </IonModal>
        <IonModal
          isOpen={showVendorInfoModal == 0 ? false : true}
          onDidDismiss={() => setShowVendorInfoModal(0)}
        >
          <ModalVendorInfo
            id={showVendorInfoModal}
            setShowVendorInfoModal={setShowVendorInfoModal}
          />
        </IonModal>
        <IonList id="menu-list">{VendorList}</IonList>
      </IonContent>
    </IonPage>
  );
};

export default Vendors;
