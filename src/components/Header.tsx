import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { baseText, baseTitle } from './styledComponents';
import logo from '../assets/images/art-value-logo.webp';

const HeaderWrapper = styled.div`
	${baseTitle}
	border-bottom: 2px solid ${(props) => props.theme.color.border};
	text-decoration: none;
	height: 30vh;
`;

const List = styled.ul`
    padding: 0;    
    display: grid;
    grid-template-columns: repeat(5, 100px)
    grip-gap: 10px
    justify-content: center
    justify-items: center
`;

const ListItem = styled.li`
	list-style: none;
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
	&:hover {
		opacity: 0.5;
	}
`;

const OngoingAuction = 'Ongoing Auction';
const Gallery = 'Gallery';
const Calender = 'Calender';
const MyProfile = 'My Profile';

const Header = () => {
	return (
		<HeaderWrapper>
			<List>
				<ListItem>
					<StyledLink to="/" exact>
						<img alt="art value logo" src={logo} style={{ width: 'auto', height: '60px' }} />
					</StyledLink>
				</ListItem>
				<ListItem>
					<StyledLink to="/ongoing-auction" exact>
						{OngoingAuction}
					</StyledLink>
				</ListItem>
				<ListItem>
					<StyledLink to="/gallery" exact>
						{Gallery}
					</StyledLink>
				</ListItem>
				<ListItem>
					<StyledLink to="/calender" exact>
						{Calender}
					</StyledLink>
				</ListItem>
				<ListItem>
					<StyledLink to="/my-profile" exact>
						{MyProfile}
					</StyledLink>
				</ListItem>
			</List>
		</HeaderWrapper>
	);
};

export default Header;
