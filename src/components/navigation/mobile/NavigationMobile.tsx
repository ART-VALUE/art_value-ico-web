import { useState, FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Burger } from './Burger/Burger';
import { Menu } from './Menu/Menu';

const Wrapper = styled.div`
	padding: 0;
`;

const Logo = styled.img`
	max-width: 160px;
	height: auto;
	position: absolute;
	top: 2%;
	right: 1rem;
`;

type MobileProps = {
	logo: string;
	tabs: ReadonlyArray<string>;
	paths: ReadonlyArray<string>;
};

interface MobileState {
	open: boolean;
}

/* TODO: add click on side of menu to close it */
/*  Add styling to div*/

export const HeaderMobile: FunctionComponent<MobileProps> = ({ logo, tabs, paths }) => {
	const [open, setOpen] = useState<MobileState['open']>(false);
	const history = useHistory();
	return (
		<Wrapper>
			<Logo className="menu-item" alt="art value logo" src={logo} onClick={() => history.push(paths[0])} />
			<Burger open={open} setOpen={setOpen} />
			<Menu open={open} setOpen={setOpen} tabs={tabs} paths={paths} />
		</Wrapper>
	);
};
