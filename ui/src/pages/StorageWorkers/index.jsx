import Typography from '@suid/material/Typography'
import Grid from '@suid/material/Grid'
import Stack from '@suid/material/Stack'
import Paper from '@suid/material/Paper'
import Box from '@suid/material/Box'
import Button from '@suid/material/Button'
import Chip from '@suid/material/Chip'
import { Show, createSignal, mapArray, onMount } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import SmartToyIcon from '@suid/icons-material/SmartToy'
import AddIcon from '@suid/icons-material/Add'
import CheckCircleIcon from '@suid/icons-material/CheckCircle'

import API from '../../api'

const StorageWorkers = () => {
	/**
	 * @type {[import("solid-js").Accessor<import("../../api").StorageWorker[]>, any]}
	 */
	const [storageWorkers, setStorageWorkers] = createSignal([])
	const navigate = useNavigate()

	onMount(async () => {
		const storageWorkers = await API.storageWorkers.listStorageWorkers()
		setStorageWorkers(storageWorkers)
	})

	// Mask token for display
	const maskToken = (token) => {
		if (!token) return '***'
		return token.substring(0, 8) + '...' + token.substring(token.length - 4)
	}

	return (
		<Stack container>
			{/* Header */}
			<Grid container sx={{ mb: 4, alignItems: 'center' }}>
				<Grid item xs={6}>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<Box sx={{
							width: 48,
							height: 48,
							borderRadius: '14px',
							background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
						}}>
							<SmartToyIcon sx={{ fontSize: 28, color: 'white' }} />
						</Box>
						<Box>
							<Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
								Storage Workers
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Telegram bots that handle file uploads
							</Typography>
						</Box>
					</Box>
				</Grid>
				<Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button
						onClick={() => navigate('/storage_workers/register')}
						variant="contained"
						startIcon={<AddIcon />}
						sx={{
							px: 3,
							py: 1.2,
							borderRadius: '12px',
							textTransform: 'none',
							fontWeight: 600,
						}}
					>
						Add Worker
					</Button>
				</Grid>
			</Grid>

			{/* Workers Grid */}
			<Show
				when={storageWorkers().length}
				fallback={
					<Paper sx={{
						p: 6,
						textAlign: 'center',
						borderStyle: 'dashed',
						borderWidth: 2,
						background: 'transparent',
					}}>
						<SmartToyIcon sx={{ fontSize: 64, color: 'text.secondary', opacity: 0.5, mb: 2 }} />
						<Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
							No storage workers yet
						</Typography>
						<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
							Add a Telegram bot to start uploading files
						</Typography>
						<Button
							onClick={() => navigate('/storage_workers/register')}
							variant="contained"
							startIcon={<AddIcon />}
						>
							Add Worker
						</Button>
					</Paper>
				}
			>
				<Grid container spacing={3}>
					{mapArray(storageWorkers, (sw) => (
						<Grid item xs={12} sm={6} md={4}>
							<Paper sx={{ p: 3 }}>
								{/* Bot Icon */}
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
									<Box sx={{
										width: 48,
										height: 48,
										borderRadius: '12px',
										background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}>
										<SmartToyIcon sx={{ fontSize: 28, color: 'white' }} />
									</Box>
									<Box sx={{ flex: 1 }}>
										<Typography variant="h6" sx={{ fontWeight: 600 }}>
											{sw.name}
										</Typography>
										<Chip
											icon={<CheckCircleIcon sx={{ fontSize: 14 }} />}
											label="Active"
											size="small"
											color="success"
											sx={{ height: 22, fontSize: '0.7rem' }}
										/>
									</Box>
								</Box>

								{/* Token (masked) */}
								<Box sx={{
									p: 1.5,
									borderRadius: '8px',
									background: 'rgba(0, 102, 255, 0.05)',
									border: '1px solid',
									borderColor: 'divider',
								}}>
									<Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
										Bot Token
									</Typography>
									<Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
										{maskToken(sw.token)}
									</Typography>
								</Box>
							</Paper>
						</Grid>
					))}
				</Grid>
			</Show>
		</Stack>
	)
}

export default StorageWorkers
