import styled from 'styled-components';
import { BaseTitle } from '../../style/base';

type StyledNavigationProps = {
	viewportWidth: number;
};

export const StyledNavigation = styled.div<StyledNavigationProps>`
	${BaseTitle}
	height: ${({ viewportWidth }) => (viewportWidth < 700 ? '85px' : '56px')};
`;
