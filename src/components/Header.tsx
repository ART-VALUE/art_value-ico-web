import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { baseText, baseTitle } from './styledComponents';
import logo from '../assets/images/art-value-logo.webp';

const HeaderWrapper = styled.div`
	${baseTitle}
	border-bottom: 2px solid ${(props) => props.theme.color.border};
	text-decoration: none;
`;

const LinkList = styled.ul`
    display: grid;
    grid-template-columns: repeat(5, 100px)
    grip-gap: 10px
    justify-content: center
    justify-items: center
`;

const LinkListItem = styled.li`
	grid-column: 1 / 6;
	list-style-type: none;
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
`

const OngoingAuction = 'Ongoing Auction';
const Gallery = 'Gallery';
const Calender = 'Calender';
const MyProfile = 'My Profile';

const Header = () => {
	return (
		<HeaderWrapper>
			<LinkList>
				<LinkListItem>
					<StyledLink to="/" exact>
						<img alt="art value logo" src={logo} style={{ width: 'auto', height: '60px' }} />
					</StyledLink>
				</LinkListItem>
				<LinkListItem>
					<StyledLink to="/ongoing-auction" exact>
						{OngoingAuction}
					</StyledLink>
				</LinkListItem>
				<LinkListItem>
					<StyledLink to="/gallery" exact>
						{Gallery}
					</StyledLink>
				</LinkListItem>
				<LinkListItem>
					<StyledLink to="/calender" exact>
						{Calender}
					</StyledLink>
				</LinkListItem>
				<LinkListItem>
					<StyledLink to="/my-profile" exact>
						{MyProfile}
					</StyledLink>
				</LinkListItem>
			</LinkList>
		</HeaderWrapper>
	);
};

export default Header;
