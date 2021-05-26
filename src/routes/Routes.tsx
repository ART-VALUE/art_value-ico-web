import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RoutingPaths from './RoutingPaths';
import Profile from '../ui/components/Profile';
import HomeView from '../ui/components/Home';

export const Routes = (props: { children?: React.ReactChild }) => {
	return (
		<BrowserRouter>
			{props.children}
			<Switch>
				<Route exact path={RoutingPaths.homeView} component={HomeView} />
				<Route exact path={RoutingPaths.myProfile} component={Profile} />
				<Route component={HomeView} />
			</Switch>
		</BrowserRouter>
	);
};
