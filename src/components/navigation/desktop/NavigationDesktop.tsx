import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const DesktopWrapper = styled.div`
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
const DesktopLink = styled.span.attrs({ className })`
	text-decoration: none;
	&. ${className} {
		font-weight: bold;
	}
	&:hover {
		opacity: 0.6;
	}
`;

const DesktopLogo = styled.img`
	width: 120px;
	height: auto;
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

type DesktopProps = {
	logo: string;
	tabs: ReadonlyArray<string>;
	paths: ReadonlyArray<string>;
};

/* Make number of tabs and paths selectable */
/* Fix className and currentRoute */
/* Move css for StyledLink inside component */

export const HeaderDesktop: FunctionComponent<DesktopProps> = ({ logo, tabs, paths }) => {
	const history = useHistory();
	const currentRoute = useHistory().location.pathname.toLowerCase();
	return (
		<DesktopWrapper>
			<DesktopLogo alt="art value logo" src={logo} onClick={() => history.push(paths[0])}></DesktopLogo>
			<NavList>
				<NavListItem>
					<DesktopLink
						className={currentRoute.includes(paths[1]) ? 'active' : ''}
						onClick={() => history.push(paths[1])}
					>
						{tabs[0]}
					</DesktopLink>
				</NavListItem>
				<NavListItem>
					<DesktopLink onClick={() => history.push(paths[2])}>{tabs[1]}</DesktopLink>
				</NavListItem>
				<NavListItem>
					<DesktopLink onClick={() => history.push(paths[3])}>{tabs[2]}</DesktopLink>
				</NavListItem>
			</NavList>
			<User>
				<DesktopLink onClick={() => history.push(paths[4])}>{tabs[3]}</DesktopLink>
			</User>
		</DesktopWrapper>
	);
};
