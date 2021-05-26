import { FunctionComponent } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { DesktopWrapper, DesktopLink, DesktopLogo, NavList, NavListItem, User } from './StyledDesktop.styles';

type DesktopProps = {
	logo: string;
	tabs: ReadonlyArray<string>;
	paths: ReadonlyArray<string>;
};

export const NavigationDesktop: FunctionComponent<DesktopProps> = ({ logo, tabs, paths }) => {
	const history = useHistory();
	const currentRoute = useLocation();

	return (
		<DesktopWrapper>
			<DesktopLogo alt="art value logo" src={logo} onClick={() => history.push(paths[0])}></DesktopLogo>
			<NavList>
				<NavListItem>
					<DesktopLink
						activeLink={currentRoute.pathname.includes(paths[1]) ? 'active' : 'notActive'}
						onClick={() => history.push(paths[1])}
					>
						{tabs[1]}
					</DesktopLink>
				</NavListItem>
				<NavListItem>
					<DesktopLink
						activeLink={currentRoute.pathname.includes(paths[2]) ? 'active' : 'notActive'}
						onClick={() => history.push(paths[2])}
					>
						{tabs[2]}
					</DesktopLink>
				</NavListItem>
				<NavListItem>
					<DesktopLink activeLink={'notActive'} onClick={() => window.location.href = 'https://artvalue.org'}>
						ArtValue.org
					</DesktopLink>
				</NavListItem>
			</NavList>
		</DesktopWrapper>
	);
};
