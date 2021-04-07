import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { baseText, baseTitle } from './styledComponents';
import logo from '../assets/images/art-value-logo.webp';

const HeaderWrapper = styled.div`
	${baseTitle}
	border-bottom: 2px solid ${(props) => props.theme.color.border};
	background-color: ${(props) => props.theme.color.surface};
	height: 10vh;
	text-decoration: none;
`;

const className = 'nav-item';
const activeClassName = 'nav-item-active';

const StyledLink = styled(NavLink).attrs({ className, activeClassName })`
	${baseText}
	&.${className} {
		text-decoration: none;
	}
	&.${activeClassName} {
		font-weight: bold;
	}
`;

const OngoingAuction = 'Ongoing Auction';
const Gallery = 'Gallery';
const Calender = 'Calender';
const MyProfile = 'My Profile';

const Header = () => {
	return (
		<HeaderWrapper>
			<StyledLink to="/" exact>
				<img alt="art value logo" src={logo} width="100px" />
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
		</HeaderWrapper>
	);
};

export default Header;
