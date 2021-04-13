import { useState, FunctionComponent } from 'react';
import { Burger } from './Burger/Burger';
import { Menu } from './Menu/Menu';

type MobileProps = {
	logo: string;
	tabs: ReadonlyArray<string>;
	paths: ReadonlyArray<string>;
};

interface MobileState {
	open: boolean;
}

export const HeaderMobile: FunctionComponent<MobileProps> = ({ logo, tabs, paths }) => {
	const [open, setOpen] = useState<MobileState['open']>(false);

	return (
		<div>
			<Burger open={open} setOpen={setOpen} />
			<Menu open={open} setOpen={setOpen} logo={logo} tabs={tabs} paths={paths} />
		</div>
	);
};
