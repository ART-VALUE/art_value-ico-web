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
		grid-template-columns:
			max-content
			min-content
			auto
			min-content;
		grid-template-areas: 'logo nav user';
		align-items: center;
		padding: 0.2em;
		border-bottom: 2px solid ${(props) => props.theme.color.border};
	}
`;

const Logo = styled.div`
	@media (min-width: 768px) {
		grid-area: logo;
		justify-self: start;
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
	}
`;

const className = 'header-item';
const activeClassName = 'header-item-active';
/* Make hover conditional */
const StyledLink = styled(NavLink).attrs({ className, activeClassName })`
	${baseText}
	&.${className} {
		text-decoration: none;
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
				<NavList>
					<NavListItem>
						<StyledLink to="/ongoing-auction" exact>
							{OngoingAuction}
						</StyledLink>
					</NavListItem>
					<NavListItem>
						<StyledLink to="/gallery" exact>
							{Gallery}
						</StyledLink>
					</NavListItem>
					<NavListItem>
						<StyledLink to="/calender" exact>
							{Calender}
						</StyledLink>
					</NavListItem>
				</NavList>
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
