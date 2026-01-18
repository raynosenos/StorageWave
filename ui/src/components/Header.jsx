import AppBar from '@suid/material/AppBar'
import Toolbar from '@suid/material/Toolbar'
import Typography from '@suid/material/Typography'
import IconButton from '@suid/material/IconButton'
import { A, useNavigate } from '@solidjs/router'
import LogoutIcon from '@suid/icons-material/Logout'
import LightModeIcon from '@suid/icons-material/LightMode'
import DarkModeIcon from '@suid/icons-material/DarkMode'
import Box from '@suid/material/Box'
import CloudIcon from '@suid/icons-material/Cloud'

import createLocalStore from '../../libs'
import { useTheme } from '../common/utils'

const Header = () => {
	const [_store, setStore] = createLocalStore()
	const navigate = useNavigate()
	const { isDark, toggleTheme } = useTheme()

	const logout = (_) => {
		setStore('access_token')
		setStore('redirect', '/')

		navigate('/login')
	}

	return (
		<AppBar
			elevation={0}
			sx={{
				backdropFilter: 'blur(20px)',
				borderBottom: '1px solid',
				borderColor: 'rgba(255, 255, 255, 0.1)',
			}}
		>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<A href="/">
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
						{/* Logo Icon */}
						<Box sx={{
							width: 40,
							height: 40,
							borderRadius: '12px',
							background: 'rgba(255, 255, 255, 0.15)',
							backdropFilter: 'blur(10px)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							border: '1px solid rgba(255, 255, 255, 0.2)',
						}}>
							<CloudIcon sx={{ fontSize: 24, color: 'white' }} />
						</Box>

						{/* Logo Text */}
						<Typography
							variant="h5"
							noWrap
							sx={{
								fontWeight: 700,
								color: 'white',
								letterSpacing: '-0.5px',
							}}
						>
							StorageWave
						</Typography>
					</Box>
				</A>

				<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
					{/* Dark Mode Toggle */}
					<IconButton
						onClick={toggleTheme}
						sx={{
							color: 'white',
							background: 'rgba(255, 255, 255, 0.1)',
							'&:hover': {
								background: 'rgba(255, 255, 255, 0.2)',
							}
						}}
						title={isDark() ? 'Light Mode' : 'Dark Mode'}
					>
						{isDark() ? <LightModeIcon /> : <DarkModeIcon />}
					</IconButton>

					{/* Logout */}
					<IconButton
						onClick={logout}
						title="Logout"
						sx={{
							color: 'white',
							background: 'rgba(255, 255, 255, 0.1)',
							'&:hover': {
								background: 'rgba(255, 100, 100, 0.3)',
							}
						}}
					>
						<LogoutIcon />
					</IconButton>
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default Header
