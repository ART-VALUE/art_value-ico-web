import styled from 'styled-components';

type StyledMenuProps = {
	open: boolean;
}

export const StyledMenu=styled.nav<StyledMenuProps>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	background: gray;
	height: 100vh;
	text-align: left;
	padding: 2rem;
	position: absolute;
	top: 0;
	left: 0;
	transition: transform 0.3s ease-in-out;

	div {
		font-size: 1rem;
		text-transform: uppercase;
		padding: 1rem 0;
		font-weight: bold;
		letter-spacing: 0.5rem;
		color: white;
		text-decoration: none;
		transition: color 0.3s linear;
	}
`;
