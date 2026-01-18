import Typography from '@suid/material/Typography'
import Box from '@suid/material/Box'
import Button from '@suid/material/Button'
import { useNavigate } from '@solidjs/router'
import HomeIcon from '@suid/icons-material/Home'
import CloudOffIcon from '@suid/icons-material/CloudOff'

const NotFound = () => {
	const navigate = useNavigate()

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
				minHeight: '60vh',
				textAlign: 'center',
				px: 3,
			}}
		>
			{/* Icon */}
			<Box sx={{
				width: 120,
				height: 120,
				borderRadius: '30px',
				background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.1), rgba(0, 212, 255, 0.05))',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				mb: 4,
				border: '2px dashed',
				borderColor: 'primary.main',
				opacity: 0.8,
			}}>
				<CloudOffIcon sx={{ fontSize: 64, color: 'primary.main', opacity: 0.6 }} />
			</Box>

			{/* 404 Text */}
			<Typography
				variant="h1"
				sx={{
					fontWeight: 800,
					fontSize: { xs: '6rem', md: '8rem' },
					background: 'linear-gradient(135deg, #0066FF, #00D4FF)',
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
					lineHeight: 1,
					mb: 2,
				}}
			>
				404
			</Typography>

			<Typography
				variant="h5"
				sx={{
					fontWeight: 600,
					mb: 1,
					color: 'text.primary',
				}}
			>
				Page Not Found
			</Typography>

			<Typography
				variant="body1"
				color="text.secondary"
				sx={{ mb: 4, maxWidth: 400 }}
			>
				The page you're looking for doesn't exist or has been moved.
			</Typography>

			<Button
				variant="contained"
				startIcon={<HomeIcon />}
				onClick={() => navigate('/')}
				sx={{
					px: 4,
					py: 1.5,
					borderRadius: '12px',
					textTransform: 'none',
					fontWeight: 600,
				}}
			>
				Back to Home
			</Button>
		</Box>
	)
}

export default NotFound
