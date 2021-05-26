import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { StyledMenu } from './StyledMenu.styles';

interface MenuProps {
	open: boolean;
	setOpen: (value: boolean) => void;
	tabs: ReadonlyArray<string>;
	paths: ReadonlyArray<string>;
}

export const Menu: FunctionComponent<MenuProps> = ({ open, tabs, paths }) => {
	const history = useHistory();
	return (
		<StyledMenu open={open}>
			<div className="menu-item" onClick={() => history.push(paths[1])}>
				{tabs[1]}
			</div>
			<div className="menu-item" onClick={() => history.push(paths[2])}>
				{tabs[2]}
			</div>
			<div className="menu-item" onClick={() => window.location.href = 'https://artvalue.org'}>
				ArtValue.org
			</div>
		</StyledMenu>
	);
};
