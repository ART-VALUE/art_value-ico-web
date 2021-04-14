import styled from 'styled-components';
import { baseTitle } from '../styledComponents';

type StyledNavigationProps = {
	viewportWidth: number;
};

export const StyledNavigation = styled.div<StyledNavigationProps>`
	${baseTitle}
	height: ${({ viewportWidth }) => (viewportWidth < 700 ? '85px' : '56px')};
`;
