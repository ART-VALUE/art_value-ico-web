import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RoutingPaths from './RoutingPaths';
import PreIco from '../components/PreIco';
import { GalleryView } from '../view/navigationview/GalleryView';
import { CalenderView } from '../view/navigationview/CalenderView';
import { MyProfile } from '../view/navigationview/MyProfile';
import { HomeView } from '../view/navigationview/HomeView';

export const Routes = (props: { children?: React.ReactChild }) => {
	return (
		<BrowserRouter>
			{props.children}
			<Switch>
				<Route exact path={RoutingPaths.auctionView} component={PreIco} />
				<Route exact path={RoutingPaths.galleryView} component={GalleryView} />
				<Route exact path={RoutingPaths.calenderView} component={CalenderView} />
				<Route exact path={RoutingPaths.myProfile} component={MyProfile} />
				<Route component={HomeView} />
			</Switch>
		</BrowserRouter>
	);
};
