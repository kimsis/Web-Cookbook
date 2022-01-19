import { IonRow, IonGrid, IonImg } from "@ionic/react";
import { Dispatch, SetStateAction, useState } from "react";
import "./ContentSwiper.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";
import "swiper/components/zoom/zoom.min.css";
import "@ionic/react/css/ionic-swiper.css";
import Displayable from "../../../shared/interfaces/Displayable.interface";

const ContentSwiper: React.FC<{
  addItems: boolean;
  title: string;
  showModal: Dispatch<SetStateAction<number>>;
  items: Displayable[] | null;
}> = (props) => {
  let slideWidth = "100px";
  let slideHeight = "100px";
  function getItems(): JSX.Element | JSX.Element[] {
    let itemsDOM;
    if (props.items != null && props.items.length > 0) {
      itemsDOM = props.items.map((item, key) => (
        <SwiperSlide
          key={key}
          onClick={() => props.showModal(item.id)}
          style={{
            height: slideHeight,
            width: slideWidth,
            alignItems: "center",
            display: "flex",
          }}
        >
          <IonImg alt="item thumbnail" src={item.imagePath} />
        </SwiperSlide>
      ));
    } else {
      itemsDOM = (
        <SwiperSlide
          style={{ alignItems: "center", display: "flex", marginLeft: "20px" }}
        >
          {" "}
          No items found!{" "}
        </SwiperSlide>
      );
    }
    return itemsDOM;
  }

  function newItems(): JSX.Element | null {
    let newItemDOM;
    if (props.addItems) {
      newItemDOM = (
        <SwiperSlide
          key={0}
          onClick={() => props.showModal(-1)}
          style={{ height: slideHeight, width: slideWidth }}
        >
          <IonImg
            alt="add recipe"
            src="assets/img/image_add.svg"
            class="addImage"
          />
        </SwiperSlide>
      );
    } else {
      newItemDOM = null;
    }
    return newItemDOM;
  }

  return (
    <IonGrid style={{ justifyContent: "center", margin: "auto", width: "75%" }}>
      <IonRow className="ion-row">
        <h2>{props.title}</h2>
      </IonRow>
      <IonRow className="ion-row">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={20}
          autoplay={true}
          zoom={true}
        >
          {newItems()}
          {getItems()}
        </Swiper>
      </IonRow>
    </IonGrid>
  );
};

export default ContentSwiper;
