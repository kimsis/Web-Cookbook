import { IonIcon, IonCard, IonImg, IonRow, IonCol, IonGrid } from '@ionic/react';
import { star, starHalf, starOutline, time, megaphone, earth } from 'ionicons/icons';
import './VendorListItem.css';

const VendorListItem: React.FC<{
    id: number;
    name: string;
    imagePath: string;
}> = (props) => {
    const titleFontSize = "2.7vw";
    const contentFontSize = "2.5vw";
    const iconsStyling = { margin: "5px", width: "1.5em", height: "1.5em", fontSize: contentFontSize };

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
