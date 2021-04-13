import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { StyledMenu } from './StyledMenu.styles';

interface MenuProps {
	open: boolean;
	setOpen: (value: boolean) => void;
	logo: string;
	tabs: ReadonlyArray<string>;
	paths: ReadonlyArray<string>;
}

export const Menu: FunctionComponent<MenuProps> = ({ open, logo, tabs, paths }) => {
	const history = useHistory();
	return (
		<StyledMenu open={open}>
			{/* 			<img className="menu-item" alt="art value logo" src={logo} onClick={() => history.push(paths[0])} />
			 */}{' '}
			<div className="menu-item" onClick={() => history.push(paths[1])}>
				{tabs[0]}
			</div>
			<div className="menu-item" onClick={() => history.push(paths[2])}>
				{tabs[1]}
			</div>
			<div className="menu-item" onClick={() => history.push(paths[3])}>
				{tabs[2]}
			</div>
			<div className="menu-item" onClick={() => history.push(paths[4])}>
				{tabs[3]}
			</div>
		</StyledMenu>
	);
};
