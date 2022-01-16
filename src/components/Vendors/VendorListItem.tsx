import { IonCard, IonImg, IonRow, IonCol, IonGrid } from '@ionic/react';
import './VendorListItem.css';

const VendorListItem: React.FC<{
    id: number;
    name: string;
    imagePath: string;
    longitude: number;
    latitude: number;
}> = (props) => {
    const titleFontSize = "2.7vw";

	return (        
		<IonCard>
            <IonGrid style={{color:"black", justifyContent:"center"}}>
			<IonRow>
                <IonCol size="4"style={{display:"flex"}}>
                    <IonRow>
                        <IonImg src={props.imagePath} style={{width:'100%', outerHeight:'100%'}}/>
                    </IonRow>
                </IonCol>
                <IonCol>
                    <IonRow>
                        <IonCol size="8">
                            <div style={{fontSize: titleFontSize, fontWeight: "bold"}}>{props.name}</div>
                        </IonCol>
                    </IonRow>
                </IonCol>
			</IonRow>
            </IonGrid>
		</IonCard>
	);
};

export default VendorListItem;
