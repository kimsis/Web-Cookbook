import {
  IonButton,
	IonCol,
	IonContent,
	IonIcon,
	IonItem,
	IonPage,
	IonRow,
	IonText,
	IonTitle,
} from '@ionic/react';
import { person, mail } from 'ionicons/icons';
import { useContext } from 'react';
import UserContext from '../../store/UserContext';
import RecipeListItem from '../Recipes/RecipeListItem';
import './ProfileComponent';

const ProfileComponent: React.FC<{}> = ({}) => {
	const contentFontSize = '2.5vw';
	const iconsStyling = {
		margin: '5px',
		width: '1.5em',
		height: '1.5em',
		fontSize: contentFontSize,
	};

	const userContext = useContext(UserContext);
	const user = userContext.user;
	let RecipeList;
	if (user?.recipes != null) {
		RecipeList = user.recipes.map((recipe) => (
			<div key={recipe.id}>
				<RecipeListItem
					id={recipe.id}
					title={recipe.title}
					sharedBy={recipe.sharedBy}
					countryOfOrigin={recipe.countryOfOrigin}
					type={recipe.type}
					rating={recipe.rating}
					imagePath={recipe.imagePath}
					timeToCook={recipe.preparationTimeTicks}
				/>
			</div>
		));
	} else {
		RecipeList = <div> No recipes created! </div>;
	}

  let FavouritesList;
	if (user?.favourites != null) {
		FavouritesList = user.recipes.map((recipe) => (
			<div key={recipe.id}>
				<RecipeListItem
					id={recipe.id}
					title={recipe.title}
					sharedBy={recipe.sharedBy}
					countryOfOrigin={recipe.countryOfOrigin}
					type={recipe.type}
					rating={recipe.rating}
					imagePath={recipe.imagePath}
					timeToCook={recipe.preparationTimeTicks}
				/>
			</div>
		));
	} else {
		RecipeList = <div> No recipes created! </div>;
	}
	return (
		<IonContent fullscreen>
			<IonItem style={{ marginTop: '20px' }}>
				<IonCol>
          <IonRow class="ion-justify-content-center">
            <IonButton> Logout </IonButton>
          </IonRow>
					<IonRow>
						<div style={{ display: 'flex', fontSize: contentFontSize }}>
							<IonIcon icon={person} slot='start' style={iconsStyling} />
							<div style={{ margin: 'auto' }}>{user?.fullName}</div>
						</div>
					</IonRow>
					<IonRow>
						<div style={{ display: 'flex', fontSize: contentFontSize }}>
							<IonIcon icon={mail} slot='start' style={iconsStyling} />
							<div style={{ margin: 'auto' }}>{user?.email}</div>
						</div>
					</IonRow>
				</IonCol>
			</IonItem>
			<IonItem>
				<IonCol>
					<IonRow><p> Recipes</p> </IonRow>
					{ RecipeList }
				</IonCol>
			</IonItem>
      <IonItem>
        <IonCol>
          <IonRow><p> Favourites </p></IonRow>
					{ FavouritesList }
        </IonCol>
      </IonItem>
		</IonContent>
	);
};

export default ProfileComponent;
