import { IonImg } from '@ionic/react';
import { Dispatch, SetStateAction } from 'react';
import { SwiperSlide } from 'swiper/react';
import './SwiperItem.css';

const SwiperItem: React.FC<{
    id: number;
    showModal: Dispatch<SetStateAction<number>>;
    imagePath: string;
}> = (props) => {

    let slideWidth = "250px";
    let slideHeight = "100px"

    return (
        <SwiperSlide onClick={() => props.showModal(props.id)} style={{ height: slideHeight, width: slideWidth }}>
            <IonImg alt="logo" src="..." />
        </SwiperSlide>
    );
};

export default SwiperItem;
