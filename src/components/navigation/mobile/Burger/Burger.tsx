import { FunctionComponent } from 'react';
import { StyledBurger } from './StyledBurger.styles';

interface BurgerProps {
	open: boolean;
	setOpen: (value: boolean) => void;
}

export const Burger: FunctionComponent<BurgerProps> = ({ open, setOpen }) => {
	return (
		<StyledBurger open={open} onClick={() => setOpen(!open)}>
			<div />
			<div />
			<div />
		</StyledBurger>
	);
};
