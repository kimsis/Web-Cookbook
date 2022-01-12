import {
	IonButton,
	IonCol,
	IonContent,
	IonIcon,
	IonItem,
	IonModal,
	IonPage,
	IonRow,
	IonText,
	IonTitle,
} from '@ionic/react';
import { person, mail } from 'ionicons/icons';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import AppContext from '../../store/AppContext';
import ModalCreateRecipe from '../Recipes/ModalCreateRecipe';
import RecipeListItem from '../Recipes/RecipeListItem';
import './ProfileComponent';

const ProfileComponent: React.FC<{}> = ({ }) => {
	const contentFontSize = '2.5vw';
	const iconsStyling = {
		margin: '5px',
		width: '1.5em',
		height: '1.5em',
		fontSize: contentFontSize,
	};

	const [showRecipeCreateModal, setShowRecipeCreateModal] = useState(false);
	const appContext = useContext(AppContext);
	const history = useHistory();
	let RecipeList;
	if (appContext.user?.recipes != null) {
		RecipeList = appContext.user.recipes.map((recipe) => (
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
	if (appContext.user?.favourites != null) {
		FavouritesList = appContext.user.recipes.map((recipe) => (
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

	function Logout() {
		appContext.user = null;
		history.replace('/Login')
	}
	return (
		<IonContent fullscreen>
			<IonModal isOpen={showRecipeCreateModal} onDidDismiss={() => setShowRecipeCreateModal(false)}>
				<ModalCreateRecipe showRecipeCreateModal={showRecipeCreateModal} setShowRecipeCreateModal={setShowRecipeCreateModal} />
			</IonModal>
			<IonItem style={{ marginTop: '20px' }}>
				<IonCol>
					<IonRow class="ion-justify-content-center">
						<IonButton onClick={() => { Logout() }}> Logout </IonButton>
					</IonRow>
					<IonRow class="ion-justify-content-center">
						<IonButton onClick={() => setShowRecipeCreateModal(true)}> Add Recipe </IonButton>
					</IonRow>
					<IonRow>
						<div style={{ display: 'flex', fontSize: contentFontSize }}>
							<IonIcon icon={person} slot='start' style={iconsStyling} />
							<div style={{ margin: 'auto' }}>{appContext.user?.fullName}</div>
						</div>
					</IonRow>
					<IonRow>
						<div style={{ display: 'flex', fontSize: contentFontSize }}>
							<IonIcon icon={mail} slot='start' style={iconsStyling} />
							<div style={{ margin: 'auto' }}>{appContext.user?.email}</div>
						</div>
					</IonRow>
				</IonCol>
			</IonItem>
			<IonItem>
				<IonCol>
					<IonRow><p> Recipes</p> </IonRow>
					{RecipeList}
				</IonCol>
			</IonItem>
			<IonItem>
				<IonCol>
					<IonRow><p> Favourites </p></IonRow>
					{FavouritesList}
				</IonCol>
			</IonItem>
		</IonContent>
	);
};

export default ProfileComponent;
