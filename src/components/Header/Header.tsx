import styled from 'styled-components';
import { baseTitle } from '../styledComponents';
import { HeaderDesktop } from './HeaderDesktop';
import { HeaderMobile } from './HeaderMobile';
import artValueLogo from '../../assets/images/art-value-logo.webp';
import RoutingPaths from '../../routes/RoutingPaths';

const HeaderWrapper = styled.div`
	${baseTitle}
`;

/* Add array with Routher paths */
const HeaderTabs: string[] = ['Ongoing Auction', 'Gallery', 'Calender', 'My Profile'];
const RoutePaths: string[] = [
	RoutingPaths.homeView,
	RoutingPaths.auctionView,
	RoutingPaths.galleryView,
	RoutingPaths.calenderView,
	RoutingPaths.profileView,
];

const Header = () => {
	return (
		<HeaderWrapper>
			<HeaderDesktop logo={artValueLogo} tab={HeaderTabs} path={RoutePaths} />
		</HeaderWrapper>
	);
};

export default Header;
