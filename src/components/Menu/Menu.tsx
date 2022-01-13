import {
	IonContent,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonListHeader,
	IonMenu,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import {
	person,
	fastFoodOutline,
	fastFoodSharp,
	locationOutline,
	locationSharp,
	listOutline,
	listSharp,
	locateOutline,
	locateSharp,
	menuOutline,
	menuSharp,
} from 'ionicons/icons';
import './Menu.css';
import MenuItem from './MenuItem';

export interface AppPage {
	url: string;
	iosIcon: string;
	mdIcon: string;
	title: string;
}

const appPages: AppPage[] = [
	{
		title: 'Profile',
		url: '/profile',
		iosIcon: person,
		mdIcon: person,
	},
	{
		title: 'Recipes',
		url: '/recipes',
		iosIcon: fastFoodOutline,
		mdIcon: fastFoodSharp,
	},
	{
		title: 'Vendors',
		url: '/vendors',
		iosIcon: locationOutline,
		mdIcon: locationSharp,
	},
	{
		title: 'Manage Content',
		url: '/manageContent',
		iosIcon: listOutline,
		mdIcon: listSharp,
	},
	{
		title: 'Map',
		url: '/map',
		iosIcon: locateOutline,
		mdIcon: locateSharp,
	},
];

const Menu: React.FC = () => {
	const location = useLocation();

	return (
		<IonMenu contentId='main' type='overlay'>
			<IonContent>
				<IonList id='menu-list'>
					<IonListHeader>
						<IonItem>
							<IonIcon slot='start' ios={menuOutline} md={menuSharp} />
							<IonLabel>PartiRecept</IonLabel>
						</IonItem>
					</IonListHeader>
					{appPages.map((appPage, index) => {
						return (
							<MenuItem
                				key={index}
								index={index}
								appPage={appPage}
								pathname={location.pathname}
							/>
						);
					})}
				</IonList>
			</IonContent>
		</IonMenu>
	);
};

export default Menu;
