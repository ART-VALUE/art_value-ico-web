import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const StyledMenu = styled.nav`
	display: flex;
	flex-direction: column;
	justify-content: center;
	background: gray;
	height: 100vh;
	text-align: left;
	padding: 2rem;
	position: absolute;
	top: 0;
	left: 0;
	transition: transform 0.3s ease-in-out;

	div {
		font-size: 1rem;
		text-transform: uppercase;
		padding: 1rem 0;
		font-weight: bold;
		letter-spacing: 0.5rem;
		color: white;
		text-decoration: none;
		transition: color 0.3s linear;
	}
`;

type MenuProps = {
	open: boolean;
	logo: string;
	tabs: ReadonlyArray<string>;
	paths: ReadonlyArray<string>;
};

export const Menu: FunctionComponent<MenuProps> = ({ open, logo, tabs, paths }) => {
	const history = useHistory();
	return (
		<StyledMenu /* open={open} */>
{/* 			<img className="menu-item" alt="art value logo" src={logo} onClick={() => history.push(paths[0])} />
 */}			<div className="menu-item" onClick={() => history.push(paths[1])}>
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
