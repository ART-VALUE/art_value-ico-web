import { useEffect, useState } from 'react';
import { StyledNavigation } from './StyledNavigation.styles';
import { HeaderDesktop } from './desktop/NavigationDesktop';
import { HeaderMobile } from './mobile/NavigationMobile';
import HeaderLogo from '../../assets/images/art-value-logo.webp';
import RoutingPaths from '../../routes/RoutingPaths';

/* TODO: Fix height of header dependent on view */

const TabNames: string[] = ['Ongoing Auction', 'Gallery', 'Calender', 'My Profile'];
const HeaderTabs: ReadonlyArray<string> = TabNames;

const RoutePaths: string[] = [
	RoutingPaths.homeView,
	RoutingPaths.auctionView,
	RoutingPaths.galleryView,
	RoutingPaths.calenderView,
	RoutingPaths.profileView,
];
const HeaderPaths: ReadonlyArray<string> = RoutePaths;

const Header = () => {
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
			return <HeaderMobile logo={HeaderLogo} tabs={HeaderTabs} paths={HeaderPaths} />;
		} else {
			return <HeaderDesktop logo={HeaderLogo} tabs={HeaderTabs} paths={HeaderPaths} />;
		}
	};

	return <StyledNavigation viewportWidth={dimensions.width}>{handleViewportSizeChange()}</StyledNavigation>;
};

export default Header;
