import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { baseText, baseTitle } from './styledComponents';
import logo from '../assets/images/art-value-logo.webp';

const HeaderWrapper = styled.div`
	${baseTitle}
`;

const Grid = styled.div`
	display: grid;
	grid-gap: 1rem;
	justify-items: center;
	padding: 1em;
	@media (min-width: 768px) {
		grid-template-areas: 'logo nav . user';
		align-items: center;
		padding: 0.2em;
		border-bottom: 2px solid ${(props) => props.theme.color.border};
	}
`;

const Logo = styled.div`
	@media (min-width: 768px) {
		grid-area: logo;
		justify-self: start
	}
`;

const Nav = styled.div`
	@media (min-width: 768px) {
		grid-area: nav;
		justify-content: center
	}
`;

const User = styled.div`
	@media (min-width: 768px) {
		grid-area: user;
		justify-self: end
	}
`;

const className = 'header-item';
const activeClassName = 'header-item-active';
/* Make hover conditional */
const StyledLink = styled(NavLink).attrs({ className, activeClassName })`
	${baseText}
	&.${className} {
		text-decoration: none;
		margin: 0
		padding: 0
	}
	&.${activeClassName} {
		font-weight: bold;
	}
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

const OngoingAuction = 'Ongoing Auction';
const Gallery = 'Gallery';
const Calender = 'Calender';
const MyProfile = 'My Profile';

const Header = () => {
	return (
		<HeaderWrapper>
			<Grid>
				<Logo>
					<StyledLink to="/" exact>
						<img alt="art value logo" src={logo} style={{ width: 'auto', height: '60px' }} />
					</StyledLink>
				</Logo>
				<Nav>
					<StyledLink to="/ongoing-auction" exact>
						{OngoingAuction}
					</StyledLink>
					<StyledLink to="/gallery" exact>
						{Gallery}
					</StyledLink>
					<StyledLink to="/calender" exact>
						{Calender}
					</StyledLink>
				</Nav>
				<User>
					<StyledLink to="/my-profile" exact>
						{MyProfile}
					</StyledLink>
				</User>
			</Grid>
		</HeaderWrapper>
	);
};

export default Header;
