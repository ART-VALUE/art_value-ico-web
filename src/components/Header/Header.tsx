import styled from 'styled-components';
import { baseTitle } from '../styledComponents';
import { HeaderDesktop } from './HeaderDesktop';
import { HeaderMobile } from './HeaderMobile';
import artValueLogo from '../../assets/images/art-value-logo.webp';

const HeaderWrapper = styled.div`
	${baseTitle}
`;

const HeaderTabs: string[] = ['Ongoing Auction', 'Gallery', 'Calender', 'My Profile'];

const Header = () => {
	return (
		<HeaderWrapper>
			<HeaderDesktop logo={artValueLogo} tabs={HeaderTabs} />
		</HeaderWrapper>
	);
};

export default Header;
