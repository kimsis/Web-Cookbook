import {
    IonIcon,
    IonCard,
    IonImg,
    IonRow,
    IonCol,
    IonGrid,
    IonText,
    IonSlides,
    IonSlide,
    useIonViewDidEnter,
    IonicSlides,
} from "@ionic/react";
import {
    star,
    starHalf,
    starOutline,
    time,
    megaphone,
    earth,
} from "ionicons/icons";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import "./ContentSwiper.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/scrollbar/scrollbar.min.css';
import 'swiper/components/zoom/zoom.min.css';
import '@ionic/react/css/ionic-swiper.css';
import SwiperItem from "../SwiperItem/SwiperItem";
import Displayable from "../../../shared/interfaces/Displayable.interface";

const ContentSwiper: React.FC<{
    showModal: Dispatch<SetStateAction<number>>;
    items: Displayable[] | null;
}> = (props) => {

    const slideWidth = 100;

    const [items, setItems] = useState<Displayable[] | null>();

    function getItems(): JSX.Element | JSX.Element[] {

        let itemsDOM;
        if (props.items != null) {
            itemsDOM = props.items.map((item, key) => (
                <SwiperItem
                    key={item.id}
                    id={item.id}
                    imagePath={item.imagePath}
                    showModal={props.showModal}
                />
            ));
        } else {
            itemsDOM = <div> No recipes found! </div>;
        }
        return itemsDOM;
    }

    console.log(getItems());

    return (
        <IonGrid style={{ justifyContent: "center", margin: "20px 0px" }}>
            <IonRow style={{ width: "75%", margin: "auto" }}>
                <Swiper
                    autoplay={true}
                    zoom={true}
                    style={{ width: "100%" }}>
                    {getItems()}
                </Swiper>
            </IonRow>
        </IonGrid>
    );
};

export default ContentSwiper;
