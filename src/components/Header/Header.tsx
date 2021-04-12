import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { baseTitle } from '../styledComponents';
import { HeaderDesktop } from './HeaderDesktop';
import { HeaderMobile } from './HeaderMobile';
import HeaderLogo from '../../assets/images/art-value-logo.webp';
import RoutingPaths from '../../routes/RoutingPaths';

const HeaderWrapper = styled.div`
	${baseTitle}
`;

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

	const handleViewport = () => {
		if (dimensions.width < 700) {
			return <HeaderMobile logo={HeaderLogo} />;
		} else {
			return <HeaderDesktop logo={HeaderLogo} tabs={HeaderTabs} paths={HeaderPaths} />;
		}
	};

	return <HeaderWrapper>{handleViewport()}</HeaderWrapper>;
};

export default Header;
