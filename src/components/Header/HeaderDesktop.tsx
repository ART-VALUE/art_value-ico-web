import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { baseText } from '../styledComponents';
import RoutingPaths from '../../routes/RoutingPaths';

const Grid = styled.div`
	display: grid;
	grid-gap: 1rem;
	justify-items: center;
	padding: 1em;
	grid-template-columns:
		min-content
		min-content
		auto;
	grid-template-areas: 'logo nav user';
	align-items: center;
	padding: 0;
	border-bottom: 2px solid ${(props) => props.theme.color.border};
`;

const className: string = 'x';
const StyledLink = styled.span.attrs({ className })`
	${baseText}
	text-decoration: none;
	&. ${className} {
		font-weight: bold;
	}
	&:hover {
		opacity: 0.6;
	}
`;

const Logo = styled.img`
	width: auto;
	height: 60px;
	grid-area: logo;
	justify-self: start;
	margin: 0;
	padding: 0;
	cursor: pointer;
`;

const NavList = styled.ul`
	grid-area: nav;
	place-self: center;
	display: grid;
	grid-auto-flow: column;
	grid-auto-columns: max-content;
	gap: 0.5rem;
	list-style: none;
	cursor: pointer;
`;

const NavListItem = styled.li`
	margin-right: 0.5em;
`;

const User = styled.div`
	grid-area: user;
	justify-self: end;
	margin-right: 0.5em;
	cursor: pointer;
`;

type HeaderDesktopLogo = {
	logo: string;
	tabs: Array<string>;
	paths: Array<string>;
};

export const HeaderDesktop: FunctionComponent<HeaderDesktopLogo> = ({ logo, tabs, paths }) => {
    console.log(paths)
	const history = useHistory();
	const currentRoute = useHistory().location.pathname.toLowerCase();
	return (
		<Grid>
			<Logo alt="art value logo" src={logo} onClick={() => history.push(paths[0])}></Logo>
			<NavList>
				<NavListItem>
					<StyledLink
						className={currentRoute.includes(paths[1]) ? 'active' : ''}
						onClick={() => history.push(paths[1])}
					>
						{tabs[0]}
					</StyledLink>
				</NavListItem>
				<NavListItem>
					<StyledLink onClick={() => history.push(paths[2])}>{tabs[1]}</StyledLink>
				</NavListItem>
				<NavListItem>
					<StyledLink onClick={() => history.push(paths[3])}>{tabs[2]}</StyledLink>
				</NavListItem>
			</NavList>
			<User>
				<StyledLink onClick={() => history.push(paths[4])}>{tabs[3]}</StyledLink>
			</User>
		</Grid>
	);
};
