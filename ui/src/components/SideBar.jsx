import Drawer from '@suid/material/Drawer'
import List from '@suid/material/List'
import Divider from '@suid/material/Divider'
import IconButton from '@suid/material/IconButton'
import ChevronLeftIcon from '@suid/icons-material/ChevronLeft'
import ChevronRightIcon from '@suid/icons-material/ChevronRight'
import ListItem from '@suid/material/ListItem'
import ListItemButton from '@suid/material/ListItemButton'
import Box from '@suid/material/Box'
import Typography from '@suid/material/Typography'
import { createSignal, Show } from 'solid-js'
import StorageIcon from '@suid/icons-material/Storage'
import SmartToyIcon from '@suid/icons-material/SmartToyOutlined'

import SideBarItem from './SideBarItem'

const initOpen = window.innerWidth > 840

const SideBar = () => {
	const [open, setOpen] = createSignal(initOpen)

	const toggleDrawerOpen = () => {
		setOpen((open) => !open)
	}

	return (
		<Drawer
			variant="permanent"
			open
			classes={{
				paper: open()
					? 'drawer-paper drawer-paper-opened'
					: 'drawer-paper drawer-paper-closed',
			}}
			sx={{
				'& .MuiDrawer-paper': {
					borderRight: 'none',
					background: 'transparent',
				}
			}}
		>
			<Box sx={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
			}}>
				{/* Toggle Button */}
				<List sx={{ py: 1 }}>
					<ListItem disablePadding sx={{ display: 'block' }}>
						<ListItemButton
							sx={{
								justifyContent: open() ? 'end' : 'center',
								py: 0.5,
								px: 1,
								borderRadius: '8px',
								mx: 1,
							}}
							onClick={toggleDrawerOpen}
						>
							<IconButton size="small">
								{open() ? <ChevronLeftIcon /> : <ChevronRightIcon />}
							</IconButton>
						</ListItemButton>
					</ListItem>
				</List>

				<Divider sx={{ mx: 2, opacity: 0.5 }} />

				{/* Navigation Items */}
				<List sx={{ px: 1, py: 2, flex: 1 }}>
					<SideBarItem text="Storages" link="/storages" isFull={open()}>
						<StorageIcon />
					</SideBarItem>
					<SideBarItem
						text="Storage Workers"
						link="/storage_workers"
						isFull={open()}
					>
						<SmartToyIcon />
					</SideBarItem>
				</List>

				{/* Footer when expanded */}
				<Show when={open()}>
					<Box sx={{
						p: 2,
						borderTop: '1px solid',
						borderColor: 'divider',
					}}>
						<Typography
							variant="caption"
							color="text.secondary"
							sx={{
								display: 'block',
								textAlign: 'center',
								opacity: 0.6,
							}}
						>
							StorageWave v1.0
						</Typography>
					</Box>
				</Show>
			</Box>
		</Drawer>
	)
}

export default SideBar
