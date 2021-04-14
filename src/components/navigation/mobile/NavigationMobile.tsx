import { useState, FunctionComponent, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useOnClickOutside } from '../../hooks/hooks';
import styled from 'styled-components';
import { Burger } from './Burger/Burger';
import { Menu } from './Menu/Menu';

const Wrapper = styled.div`
	padding: 0;
	height: 85px
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

export const NavigationMobile: FunctionComponent<MobileProps> = ({ logo, tabs, paths }) => {
	const [open, setOpen] = useState<MobileState['open']>(false);
	const node = useRef<HTMLDivElement>(null);
	useOnClickOutside(node, () => setOpen(false));
	const history = useHistory();
	return (
		<Wrapper ref={node}>
			<Logo className="menu-item" alt="art value logo" src={logo} onClick={() => history.push(paths[0])} />
			<Burger open={open} setOpen={setOpen} />
			<Menu open={open} setOpen={setOpen} tabs={tabs} paths={paths} />
		</Wrapper>
	);
};
