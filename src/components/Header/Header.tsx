import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { baseText, baseTitle } from '../styledComponents';
import { HeaderDesktop } from './HeaderDesktop';
import { HeaderMobile } from './HeaderMobile';
import artValueLogo from '../../assets/images/art-value-logo.webp';
import RoutingPaths from '../../routes/RoutingPaths';

const HeaderWrapper = styled.div`
	${baseTitle}
`;

const Grid = styled.div`
	display: grid;
	grid-gap: 1rem;
	justify-items: center;
	padding: 1em;
	@media (min-width: 768px) {
		grid-template-columns:
			min-content
			min-content
			auto;
		grid-template-areas: 'logo nav user';
		align-items: center;
		padding: 0;
		border-bottom: 2px solid ${(props) => props.theme.color.border};
	}
`;

const Logo = styled.img`
	width: auto;
	height: 60px;
	@media (min-width: 768px) {
		grid-area: logo;
		justify-self: start;
		margin: 0;
		padding: 0;
	}
`;

const NavList = styled.ul`
	@media (min-width: 768px) {
		grid-area: nav;
		place-self: center;
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: max-content;
		gap: 0.5rem;
		list-style: none;
	}
`;

const NavListItem = styled.li`
	@media (min-width: 768px) {
		margin-right: 0.5em;
	}
`;

const User = styled.div`
	@media (min-width: 768px) {
		grid-area: user;
		justify-self: end;
		margin-right: 0.5em;
	}
`;

/* Add boolean to control bold or not */
const StyledLink = styled.span`
	${baseText}
	font-weight: bold;
	text-decoration: none;
	&:hover {
		opacity: 0.6;
	}
	@media (max-width: 768px) {
		font-size: 1.2em;
		min-height: 50px;
		&:hover {
			opacity: 1;
		}
	}
`;

const OngoingAuction: string = 'Ongoing Auction';
const Gallery: string = 'Gallery';
const Calender: string = 'Calender';
const MyProfile: string = 'My Profile';

const Header = () => {
	const history = useHistory();
	return (
		<HeaderWrapper>
			<Grid>
				<Logo
					alt="art value logo"
					src={artValueLogo}
					onClick={() => history.push(RoutingPaths.homeView)}
				></Logo>
				<NavList>
					<NavListItem>
						<StyledLink onClick={() => history.push(RoutingPaths.auctionView)}>{OngoingAuction}</StyledLink>
					</NavListItem>
					<NavListItem>
						<StyledLink onClick={() => history.push(RoutingPaths.galleryView)}>{Gallery}</StyledLink>
					</NavListItem>
					<NavListItem>
						<StyledLink onClick={() => history.push(RoutingPaths.calenderView)}>{Calender}</StyledLink>
					</NavListItem>
				</NavList>
				<User>
					<StyledLink onClick={() => history.push(RoutingPaths.profileView)}>{MyProfile}</StyledLink>
				</User>
			</Grid>
		</HeaderWrapper>
	);
};

export default Header;
