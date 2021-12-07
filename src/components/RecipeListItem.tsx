import { IonItem, IonIcon, IonLabel, IonCard, IonImg, IonRow, IonCol, IonGrid } from '@ionic/react';
import { star, starHalf, starOutline, time, megaphone, cellular, fastFood, earth, egg, timer } from 'ionicons/icons';
import './RecipeListItem.css';

const RecipeListItem: React.FC<{
    id: number;
    title: string;
    sharedBy: string;
    countryOfOrigin: string;
    type: string;
    rating: number;
    imagePath: string;
    timeToCook: number;
}> = (props) => {
    const starsArray = new Array(5).fill(0);
    const titleFontSize = "2.7vw";
    const contentFontSize = "2.5vw";
    const iconsStyling = { margin: "5px", width: "1.5em", height: "1.5em", fontSize: contentFontSize };
    const starStyling = { fontSize: titleFontSize, width: "1em",height: "1em",color: "#F2AB27" }

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
                            <div style={{fontSize: titleFontSize, fontWeight: "bold"}}>{props.title}</div>
                        </IonCol>
                        <IonCol className="ion-align-self-center ion-text-right">
                            {starsArray.map((x, i) => {
                                if (i + 1 <= props.rating) {
                                    return <IonIcon icon={star} style={starStyling}></IonIcon>
                                }
                                else if (i + 1 > props.rating && i < props.rating) {
                                    return <IonIcon icon={starHalf} style={starStyling}></IonIcon>
                                }
                            return <IonIcon icon={starOutline} style={starStyling}></IonIcon>
                            })}
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <div style={{display:"flex", fontSize:contentFontSize}}>
                            <IonIcon icon={time} slot="start" style={iconsStyling} />
                            <div style={{margin:"auto"}}>Time to cook: {props.timeToCook}</div>
                        </div>
                    </IonRow>
                    <IonRow>
                        <div style={{display:"flex", fontSize:contentFontSize}}>
                            <IonIcon icon={megaphone} slot="start" style={iconsStyling} />
                            <div style={{margin:"auto"}}>Shared by: {props.sharedBy}</div>
                        </div>
                    </IonRow>
                    <IonRow>
                        <div style={{display:"flex", fontSize:contentFontSize}}>
                            <IonIcon icon={earth} slot="start" style={iconsStyling} />
                            <div style={{margin:"auto"}}>Dish type: {props.type}</div>
                        </div>
                    </IonRow>
                </IonCol>
			</IonRow>
            </IonGrid>
		</IonCard>
	);
};

export default RecipeListItem;
