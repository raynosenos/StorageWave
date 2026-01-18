import { onMount } from 'solid-js'
import Container from '@suid/material/Container'
import Box from '@suid/material/Box'
import TextField from '@suid/material/TextField'
import Button from '@suid/material/Button'
import Paper from '@suid/material/Paper'
import Typography from '@suid/material/Typography'
import Divider from '@suid/material/Divider'
import createLocalStore from '../../libs'
import { A, useNavigate } from '@solidjs/router'
import CloudIcon from '@suid/icons-material/Cloud'

import API from '../api'

const Login = () => {
	const [store, setStore] = createLocalStore()
	const navigate = useNavigate()

	onMount(() => {
		if (store.access_token) {
			navigate('/')
		}
	})

	/**
	 *
	 * @param {SubmitEvent} event
	 */
	const handleSubmit = async (event) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		const email = data.get('email')
		const password = data.get('password')

		const tokenData = await API.auth.login(email, password)

		setStore('access_token', tokenData.access_token)
		setStore('user', { email })

		const redirect_url = store.redirect || '/'
		navigate(redirect_url)
	}

	return (
		<Box sx={{
			minHeight: '100vh',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			position: 'relative',
			overflow: 'hidden',
		}}>
			{/* Decorative Elements */}
			<Box sx={{
				position: 'absolute',
				top: '10%',
				left: '5%',
				width: 60,
				height: 60,
				borderRadius: '50%',
				background: 'linear-gradient(135deg, #0066FF, #00D4FF)',
				opacity: 0.2,
				animation: 'float 8s ease-in-out infinite',
			}} />
			<Box sx={{
				position: 'absolute',
				bottom: '15%',
				right: '10%',
				width: 80,
				height: 80,
				borderRadius: '50%',
				background: 'linear-gradient(135deg, #00D4FF, #0066FF)',
				opacity: 0.15,
				animation: 'float 10s ease-in-out infinite reverse',
			}} />

			<Container maxWidth="sm" sx={{ width: 'fit-content', position: 'relative', zIndex: 1 }}>
				<Paper sx={{
					mt: '5vh',
					p: { xs: 3, sm: 5 },
					minWidth: { xs: 300, sm: 400 },
				}} elevation={0}>
					<Box
						component="form"
						onSubmit={handleSubmit}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: 3,
						}}
					>
						{/* Logo */}
						<Box sx={{
							width: 80,
							height: 80,
							borderRadius: '24px',
							background: 'linear-gradient(135deg, #0066FF, #00D4FF)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							boxShadow: '0 8px 32px rgba(0, 102, 255, 0.3)',
							mb: 1,
						}}>
							<CloudIcon sx={{ fontSize: 48, color: 'white' }} />
						</Box>

						{/* Title */}
						<Box sx={{ textAlign: 'center' }}>
							<Typography variant="h4" sx={{
								fontWeight: 700,
								mb: 1,
							}}>
								StorageWave
							</Typography>
							<Typography variant="body2" sx={{
								color: 'text.secondary',
								fontWeight: 400,
							}}>
								Unlimited cloud storage powered by Telegram
							</Typography>
						</Box>

						<Divider sx={{ width: '100%', my: 1 }} />

						{/* Form Fields */}
						<TextField
							name="email"
							label="Email Address"
							variant="outlined"
							type="email"
							fullWidth
							required
							sx={{
								'& .MuiInputBase-root': {
									borderRadius: '12px',
								}
							}}
						/>
						<TextField
							name="password"
							label="Password"
							variant="outlined"
							type="password"
							fullWidth
							required
							sx={{
								'& .MuiInputBase-root': {
									borderRadius: '12px',
								}
							}}
						/>

						{/* Submit Button */}
						<Button
							type="submit"
							variant="contained"
							size="large"
							fullWidth
							sx={{
								py: 1.5,
								fontSize: '1rem',
								borderRadius: '12px',
								textTransform: 'none',
								fontWeight: 600,
							}}
						>
							Sign In
						</Button>

						<Divider sx={{ width: '100%' }}>
							<Typography variant="body2" color="text.secondary">
								or
							</Typography>
						</Divider>

						{/* Register Link */}
						<Typography variant="body2" color="text.secondary">
							Don't have an account?{' '}
							<A class="default-link" href="/register">
								Create one
							</A>
						</Typography>
					</Box>
				</Paper>

				{/* Footer */}
				<Typography
					variant="caption"
					sx={{
						display: 'block',
						textAlign: 'center',
						mt: 3,
						color: 'text.secondary',
						opacity: 0.7,
					}}
				>
					🌊 StorageWave v1.0 — Your files, your cloud
				</Typography>
			</Container>
		</Box>
	)
}

export default Login
