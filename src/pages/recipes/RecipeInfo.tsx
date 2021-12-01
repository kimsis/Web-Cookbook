import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonImg, IonGrid, IonRow, IonCol, IonChip } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import './RecipeInfo.css';
import { star, starHalf, starOutline, time, megaphone, cellular, fastFood, earth, egg, timer } from 'ionicons/icons';

const Recipe: React.FC<{
  nameOfDish?: string;
  timeToCook?: string;
  sharedBy?: string;
  difficultyToCook?: string;
  dishType?: string;
  starRating?: number;
  countryOfOrigin?: string;
  numberOfServings?: string;
  preparationTime?: string;
  ingredients?: string[];
  instructions?: string;
}> = ({
  nameOfDish = "Swedish Meatballs",
  timeToCook = "80 min",
  sharedBy = "Elise Bauer",
  difficultyToCook = "Medium",
  dishType = "Meatballs",
  starRating = 4.5,
  countryOfOrigin = "Sweden",
  numberOfServings = "4 to 6 servings",
  preparationTime = "20 min",
  ingredients = ["1 tablespoon butter", "1/2 large onion", "1/4 cup milk", "3 slices bread", "1 large egg", "3/4 pound ground beef", "1/2 pound ground pork", "1 teaspoon kosher salt", "1 teaspoon black pepper", "1/2 teaspoon freshly grated nutmeg", "1/2 teaspoon ground cardamom"],
  instructions = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mauris nibh, ultricies eget pulvinar sit amet, pharetra non ipsum. Donec ipsum tellus, pharetra vitae efficitur nec, vestibulum ac justo. Maecenas porta consequat odio, et rutrum nisi. Sed aliquet eget neque molestie vehicula. Quisque ultrices imperdiet tincidunt. Donec fermentum pellentesque massa, at malesuada est. Fusce a elit in nibh suscipit pellentesque. Phasellus leo sapien, scelerisque sed egestas in, ullamcorper vitae tellus."
}) => {
    const { name } = useParams<{ name: string; }>();
    const starsArray = new Array(5).fill(0);
    const iconsStyling = { margin: "5px" };
    return (
      <IonContent>
        <IonGrid style={{ padding: '50px' }}>
          <IonRow>
            <IonCol size="3"><IonImg src="/assets/img/temp_food.png"></IonImg></IonCol>
            <IonCol>
              <IonRow>
                <IonCol>
                  <h1>{nameOfDish}</h1>
                </IonCol>
                <IonCol offset="6" className="ion-align-self-center">              {
                  starsArray.map((x, i) => {
                    if (i + 1 <= starRating) {
                      return <IonIcon icon={star} style={{width: "30px",height: "30px"}}></IonIcon>
                    }
                    else if (i + 1 > starRating && i < starRating) {
                      return <IonIcon icon={starHalf} style={{width: "30px",height: "30px"}}></IonIcon>
                    }
                    return <IonIcon icon={starOutline} style={{width: "30px",height: "30px"}}></IonIcon>
                  })
                }</IonCol>

              </IonRow>
              <IonItem color="none" lines="none" >
                <IonIcon icon={time} slot="start" style={iconsStyling} />
                <p>Time to cook: {timeToCook}</p>
              </IonItem>
              <IonItem color="none" lines="none">
                <IonIcon icon={megaphone} slot="start" style={iconsStyling} />
                <p>Shared by: {sharedBy}</p>
              </IonItem>
              <IonItem color="none" lines="none">
                <IonIcon icon={cellular} color = "warning" slot="start" style={iconsStyling} />
                <p>Difficulty to cook: {difficultyToCook}</p>
              </IonItem>
              <IonItem color="none" lines="none">
                <IonIcon icon={fastFood} slot="start" style={iconsStyling} />
                <p>Dish type: {dishType}</p>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol><h1>More Details</h1>
              <IonItem color="none" lines="none">
                <IonIcon icon={earth} slot="start" style={iconsStyling} />
                <p>Country of origin: {countryOfOrigin}</p>
              </IonItem>
              <IonItem color="none" lines="none">
                <IonIcon icon={egg} slot="start" style={iconsStyling} />
                <p>Number of servings: {numberOfServings}</p>
              </IonItem>
              <IonItem color="none" lines="none">
                <IonIcon icon={timer} slot="start" style={iconsStyling} />
                <p>Preparation time: {preparationTime}</p>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol ><h1>Ingredients</h1>
              {
                ingredients.map(x =>
                  <IonChip>
                    <IonLabel>{x}</IonLabel>
                  </IonChip>
                )
              }

            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol ><h1>Instructions</h1>
              <p>{instructions}</p> </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="1">
              <IonButton color="warning" fill="outline">Delete</IonButton>
            </IonCol>
            <IonCol size="1" offset="8">
              <IonButton color="warning" fill="solid">Edit</IonButton>
            </IonCol>
            <IonCol >
              <IonButton color="warning" fill="outline">Close</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    )
  };


export default Recipe;