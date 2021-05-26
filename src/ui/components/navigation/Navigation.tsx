import { useEffect, useState } from 'react';
import { StyledNavigation } from './StyledNavigation.styles';
import { NavigationDesktop } from './desktop/NavigationDesktop';
import { NavigationMobile } from './mobile/NavigationMobile';
import NavigationLogo from '../../../assets/images/logo-transparent.png';
import RoutingPaths from '../../../routes/RoutingPaths';

const TabNames: string[] = ['Presale', 'Presale', 'My Profile'];
const NavigationTabs: ReadonlyArray<string> = TabNames;

const RoutePaths: string[] = [
	RoutingPaths.homeView,
	RoutingPaths.homeView,
	RoutingPaths.myProfile,
];
const NavigationPaths: ReadonlyArray<string> = RoutePaths;

export const Navigation = () => {
	const [dimensions, setDimensions] = useState({
		height: window.innerHeight,
		width: window.innerWidth,
	});

	useEffect(() => {
		const handleResize = () => {
			setDimensions({
				height: window.innerHeight,
				width: window.innerWidth,
			});
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	const handleViewportSizeChange = () => {
		if (dimensions.width < 700) {
			return <NavigationMobile logo={NavigationLogo} tabs={NavigationTabs} paths={NavigationPaths} />;
		} else {
			return <NavigationDesktop logo={NavigationLogo} tabs={NavigationTabs} paths={NavigationPaths} />;
		}
	};

	return <StyledNavigation viewportWidth={dimensions.width}>{handleViewportSizeChange()}</StyledNavigation>;
};
