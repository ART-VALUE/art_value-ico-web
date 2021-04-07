import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { baseText, baseTitle } from './styledComponents';
import logo from '../assets/images/art-value-logo.webp';

const HeaderWrapper = styled.div`
	${baseTitle}
	height: 20vh
    @media (min-width: 768px) {
		border-bottom: 2px solid ${(props) => props.theme.color.border};
	}
`;

const Grid = styled.div`
	display: grid;
	grid-gap: 1rem;
	justify-items: center;
	text-align: center;
	@media (max-width: 768px) {
		padding: 1em;
	}
`;

const className = 'nav-item';
const activeClassName = 'nav-item-active';
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
		opacity: 0.5;
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
				<StyledLink to="/" exact>
					<img alt="art value logo" src={logo} style={{ width: 'auto', height: '60px' }} />
				</StyledLink>
				<StyledLink to="/ongoing-auction" exact>
					{OngoingAuction}
				</StyledLink>
				<StyledLink to="/gallery" exact>
					{Gallery}
				</StyledLink>
				<StyledLink to="/calender" exact>
					{Calender}
				</StyledLink>
				<StyledLink to="/my-profile" exact>
					{MyProfile}
				</StyledLink>
			</Grid>
		</HeaderWrapper>
	);
};

export default Header;
