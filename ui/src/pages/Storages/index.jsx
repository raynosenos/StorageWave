import Typography from '@suid/material/Typography'
import Grid from '@suid/material/Grid'
import Stack from '@suid/material/Stack'
import Paper from '@suid/material/Paper'
import Box from '@suid/material/Box'
import Button from '@suid/material/Button'
import { Show, createSignal, mapArray, onMount } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import StorageIcon from '@suid/icons-material/Storage'
import AddIcon from '@suid/icons-material/Add'
import FolderIcon from '@suid/icons-material/Folder'
import InsertDriveFileIcon from '@suid/icons-material/InsertDriveFile'

import API from '../../api'
import { convertSize } from '../../common/size_converter'

const Storages = () => {
	/**
	 * @type {[import("solid-js").Accessor<import("../../api").StorageWithInfo[]>, any]}
	 */
	const [storages, setStorages] = createSignal([])
	const navigate = useNavigate()

	onMount(async () => {
		const storagesSchema = await API.storages.listStorages()
		setStorages(storagesSchema.storages)
	})

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
							background: 'linear-gradient(135deg, #0066FF, #00D4FF)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							boxShadow: '0 4px 15px rgba(0, 102, 255, 0.3)',
						}}>
							<StorageIcon sx={{ fontSize: 28, color: 'white' }} />
						</Box>
						<Box>
							<Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
								My Storages
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Manage your cloud storage locations
							</Typography>
						</Box>
					</Box>
				</Grid>
				<Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button
						onClick={() => navigate('/storages/register')}
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
						Add Storage
					</Button>
				</Grid>
			</Grid>

			{/* Storage Cards Grid */}
			<Show
				when={storages().length}
				fallback={
					<Paper sx={{
						p: 6,
						textAlign: 'center',
						borderStyle: 'dashed',
						borderWidth: 2,
						background: 'transparent',
					}}>
						<StorageIcon sx={{ fontSize: 64, color: 'text.secondary', opacity: 0.5, mb: 2 }} />
						<Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
							No storages yet
						</Typography>
						<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
							Create your first storage to start uploading files
						</Typography>
						<Button
							onClick={() => navigate('/storages/register')}
							variant="contained"
							startIcon={<AddIcon />}
						>
							Create Storage
						</Button>
					</Paper>
				}
			>
				<Grid container spacing={3}>
					{mapArray(storages, (storage) => (
						<Grid item xs={12} sm={6} md={4}>
							<Paper
								onClick={() => navigate(`/storages/${storage.id}/files`)}
								sx={{
									p: 3,
									cursor: 'pointer',
									transition: 'all 0.3s ease',
									'&:hover': {
										transform: 'translateY(-4px)',
									}
								}}
							>
								{/* Storage Icon */}
								<Box sx={{
									width: 56,
									height: 56,
									borderRadius: '16px',
									background: 'linear-gradient(135deg, #0066FF, #00D4FF)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									mb: 2,
									boxShadow: '0 4px 15px rgba(0, 102, 255, 0.25)',
								}}>
									<FolderIcon sx={{ fontSize: 32, color: 'white' }} />
								</Box>

								{/* Storage Name */}
								<Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
									{storage.name}
								</Typography>

								{/* Chat ID */}
								<Typography variant="caption" color="text.secondary" sx={{
									display: 'block',
									mb: 2,
									fontFamily: 'monospace',
									opacity: 0.7,
								}}>
									ID: {storage.chat_id}
								</Typography>

								{/* Stats */}
								<Box sx={{
									display: 'flex',
									gap: 3,
									pt: 2,
									borderTop: '1px solid',
									borderColor: 'divider',
								}}>
									<Box>
										<Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1 }}>
											{convertSize(storage.size)}
										</Typography>
										<Typography variant="caption" color="text.secondary">
											Storage Used
										</Typography>
									</Box>
									<Box>
										<Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1 }}>
											{storage.files_amount}
										</Typography>
										<Typography variant="caption" color="text.secondary">
											Files
										</Typography>
									</Box>
								</Box>
							</Paper>
						</Grid>
					))}
				</Grid>
			</Show>
		</Stack>
	)
}

export default Storages
