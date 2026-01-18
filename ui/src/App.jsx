import { Routes, Route, Navigate } from '@solidjs/router'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@suid/material'
import { createSignal, createEffect } from 'solid-js'

import Login from './pages/Login'
import BasicLayout from './layouts/Basic'
import Storages from './pages/Storages'
import StorageCreateForm from './pages/Storages/StorageCreateForm'
import AlertStack from './components/AlertStack'
import StorageWorkers from './pages/StorageWorkers'
import StorageWorkerCreateForm from './pages/StorageWorkers/StorageWorkerCreateForm'
import Files from './pages/Files'
import UploadFileTo from './pages/Files/UploadFileTo'
import Register from './pages/Register'
import NotFound from './pages/404'
import { ThemeProvider } from './common/utils'

// Light theme
const lightTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#0066FF',
		},
		secondary: {
			main: '#00D4FF',
		},
		background: {
			default: '#f5f5f5',
			paper: '#ffffff',
		},
	},
})

// Dark theme
const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#0066FF',
		},
		secondary: {
			main: '#00D4FF',
		},
		background: {
			default: '#121212',
			paper: '#1e1e1e',
		},
		text: {
			primary: '#ffffff',
			secondary: '#b0b0b0',
		},
	},
})

const App = () => {
	const [isDark, setIsDark] = createSignal(
		localStorage.getItem('theme') === 'dark'
	)

	const toggleTheme = () => {
		const newValue = !isDark()
		setIsDark(newValue)
		localStorage.setItem('theme', newValue ? 'dark' : 'light')
	}

	// Apply dark mode to body
	createEffect(() => {
		if (isDark()) {
			document.body.classList.add('dark-mode')
			document.body.style.backgroundColor = '#121212'
			document.body.style.color = '#ffffff'
		} else {
			document.body.classList.remove('dark-mode')
			document.body.style.backgroundColor = '#f5f5f5'
			document.body.style.color = '#000000'
		}
	})

	const theme = () => (isDark() ? darkTheme : lightTheme)

	return (
		<ThemeProvider value={{ isDark, toggleTheme }}>
			<MuiThemeProvider theme={theme()}>
				<Routes>
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />

					<Route path="/" component={BasicLayout}>
						<Route path="/" element={<Navigate href="/storages" />} />
						<Route path="/storages" component={Storages} />
						<Route path="/storages/register" component={StorageCreateForm} />
						<Route path="/storages/:id/files/*path" component={Files} />
						<Route path="/storages/:id/upload_to" component={UploadFileTo} />
						<Route path="/storage_workers" component={StorageWorkers} />
						<Route
							path="/storage_workers/register"
							component={StorageWorkerCreateForm}
						/>
						<Route path="*404" component={NotFound} />
					</Route>
				</Routes>

				<AlertStack />
			</MuiThemeProvider>
		</ThemeProvider>
	)
}

export default App
