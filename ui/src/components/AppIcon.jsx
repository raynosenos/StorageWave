import SvgIcon from '@suid/material/SvgIcon'

const AppIcon = () => {
	return (
		<SvgIcon fontSize="large" sx={{ color: '#00D4FF' }}>
			<svg
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				{/* Cloud with wave - StorageWave logo */}
				<defs>
					<linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#0066FF" />
						<stop offset="100%" stopColor="#00D4FF" />
					</linearGradient>
				</defs>
				<path
					d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
					fill="url(#waveGradient)"
				/>
				{/* Wave inside cloud */}
				<path
					d="M7 14c1.5-1 3-1 4.5 0s3 1 4.5 0"
					stroke="white"
					strokeWidth="1.5"
					fill="none"
					strokeLinecap="round"
				/>
				<path
					d="M7 17c1.5-1 3-1 4.5 0s3 1 4.5 0"
					stroke="white"
					strokeWidth="1.5"
					fill="none"
					strokeLinecap="round"
				/>
			</svg>
		</SvgIcon>
	)
}

export default AppIcon
