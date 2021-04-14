import './App.scss';
import { Routes } from '../routes/Routes';
import { Navigation } from './navigation/Navigation';
import { ThemeProvider } from 'styled-components';
import { darken, lighten } from 'polished';

const colorBackground = '#0a0a0a';

const theme = {
	color: {
		background: colorBackground,
		surface: lighten(0.2, colorBackground),
		border: lighten(0.4, colorBackground),
		text: darken(0.1, '#fff'),
	},
	font: {
		text: 'Avenir95Light',
		title: 'Avenir95Black',
	},
};

export default function App() {
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<Routes>
					<Navigation />
				</Routes>
			</ThemeProvider>
		</div>
	);
}
