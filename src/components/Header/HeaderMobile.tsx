import { useState, FunctionComponent } from 'react';
import { Burger } from './MobileBurgerMenu/Burger';
import { Menu } from './MobileBurgerMenu/Menu';

type MobileProps = {
	logo: string;
	tabs: ReadonlyArray<string>;
	paths: ReadonlyArray<string>;
};

export const HeaderMobile: FunctionComponent<MobileProps> = ({ logo, tabs, paths }) => {
	
	const [open, setOpen] = useState(false);

	return (
		<div>
			<Burger open={open} setOpen={setOpen} />
			<Menu open={open} logo={logo} tabs={tabs} paths={paths}/>
		</div>
	);
};
