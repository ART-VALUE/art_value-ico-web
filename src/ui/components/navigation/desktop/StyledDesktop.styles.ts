import styled from 'styled-components';
import { BaseText } from '../../../style/base';

type DesktopLinkPropsProps = {
	activeLink: string;
};

export const DesktopWrapper = styled.div`
	display: grid;
	grid-gap: 1rem;
	justify-items: center;
	padding: 1em;
	grid-template-columns: min-content
		min-content
		auto;
	grid-template-areas: 'logo nav user';
	align-items: center;
	padding: 0;
	border-bottom: 2px solid ${(props) => props.theme.color.border};
	max-width:1124px;
	margin-left: auto;
	margin-right: auto;
	padding-top: 1rem;
`

export const DesktopLink = styled.span<DesktopLinkPropsProps>`
	${BaseText}
	font-weight: ${({ activeLink }) => (activeLink === 'active' ? 'bold' : 'normal')};
	text-decoration: none;
	&:hover {
		opacity: 0.6;
	}
`

export const DesktopLogo = styled.img`
	width: 120px;
	height: auto;
	grid-area: logo;
	justify-self: start;
	margin: 0;
	padding: 0;
	cursor: pointer;
`

export const NavList = styled.ul`
	grid-area: nav;
	justify-self: center;
	display: grid;
	grid-auto-flow: column;
	grid-auto-columns: max-content;
	gap: 0.5rem;
	list-style: none;
	cursor: pointer;
`

export const NavListItem = styled.li`
	margin-right: 5em;
`

export const User = styled.div`
	grid-area: user;
	justify-self: end;
	margin-right: 2em;
	cursor: pointer;
`
