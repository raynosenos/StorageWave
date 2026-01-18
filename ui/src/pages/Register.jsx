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
import PersonAddIcon from '@suid/icons-material/PersonAdd'

import API from '../api'
import { alertStore } from '../components/AlertStack'

const Register = () => {
	const [store, setStore] = createLocalStore()
	const { addAlert } = alertStore
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

		// Registerting
		await API.users.register(email, password)

		addAlert('You registered successfully')

		// Authenticating
		const tokenData = await API.auth.login(email, password)

		setStore('access_token', tokenData.access_token)

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
				top: '15%',
				right: '8%',
				width: 70,
				height: 70,
				borderRadius: '50%',
				background: 'linear-gradient(135deg, #00D4FF, #0066FF)',
				opacity: 0.2,
				animation: 'float 9s ease-in-out infinite',
			}} />
			<Box sx={{
				position: 'absolute',
				bottom: '20%',
				left: '8%',
				width: 50,
				height: 50,
				borderRadius: '50%',
				background: 'linear-gradient(135deg, #0066FF, #00D4FF)',
				opacity: 0.15,
				animation: 'float 7s ease-in-out infinite reverse',
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
							background: 'linear-gradient(135deg, #00D4FF, #0066FF)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							boxShadow: '0 8px 32px rgba(0, 212, 255, 0.3)',
							mb: 1,
						}}>
							<PersonAddIcon sx={{ fontSize: 48, color: 'white' }} />
						</Box>

						{/* Title */}
						<Box sx={{ textAlign: 'center' }}>
							<Typography variant="h4" sx={{
								fontWeight: 700,
								mb: 1,
							}}>
								Create Account
							</Typography>
							<Typography variant="body2" sx={{
								color: 'text.secondary',
								fontWeight: 400,
							}}>
								Join StorageWave and get unlimited storage
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
							label="Create Password"
							variant="outlined"
							type="password"
							fullWidth
							required
							helperText="Use a strong password with at least 8 characters"
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
							Create Account
						</Button>

						<Divider sx={{ width: '100%' }}>
							<Typography variant="body2" color="text.secondary">
								or
							</Typography>
						</Divider>

						{/* Login Link */}
						<Typography variant="body2" color="text.secondary">
							Already have an account?{' '}
							<A class="default-link" href="/login">
								Sign in
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
					🔒 Your data is encrypted and secure
				</Typography>
			</Container>
		</Box>
	)
}

export default Register
