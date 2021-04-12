import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const MobileWrapper = styled.div`
	display: grid;
	justify-items: center;
	padding: 1em;
`;

const MobileLogo = styled.img`
	max-width: 100%;
	height: auto;
`;

const MobileLinks = styled.div`
	font-size: 1.2em;
	min-height: 50px;
`;

type MobileProps = {
	logo: string;
};

export const HeaderMobile: FunctionComponent<MobileProps> = ({ logo }) => {
	return (
		<MobileWrapper>
			<MobileLogo alt="art value logo" src={logo} />
            <MobileLinks>HEJ!</MobileLinks>
            <MobileLinks>HEJ!</MobileLinks>
            <MobileLinks>HEJ!</MobileLinks>
		</MobileWrapper>
	);
};
