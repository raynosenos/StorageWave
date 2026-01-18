import { A, useLocation } from '@solidjs/router'
import ListItem from '@suid/material/ListItem'
import ListItemButton from '@suid/material/ListItemButton'
import ListItemIcon from '@suid/material/ListItemIcon'
import ListItemText from '@suid/material/ListItemText'
import { children, createMemo } from 'solid-js'

/**
 * @typedef {Object} SideBarItemProps
 * @property {string} text
 * @property {boolean} isFull
 * @property {string} link
 * @property {import("solid-js").JSXElement[]} children
 */

/**
 *
 * @param {SideBarItemProps} props
 */
const SideBarItem = (props) => {
	const c = children(() => props.children)
	const location = useLocation()

	const isActive = createMemo(() => location.pathname.startsWith(props.link))

	return (
		<ListItem key={props.text} disablePadding sx={{ display: 'block', mb: 0.5 }}>
			<A href={props.link}>
				<ListItemButton
					sx={{
						minHeight: 48,
						justifyContent: props.isFull ? 'initial' : 'center',
						px: 2,
						py: 1.2,
						borderRadius: '10px',
						transition: 'all 0.2s ease',
						background: isActive()
							? 'linear-gradient(135deg, rgba(0, 102, 255, 0.15), rgba(0, 212, 255, 0.1))'
							: 'transparent',
						borderLeft: isActive() ? '3px solid' : '3px solid transparent',
						borderColor: isActive() ? 'primary.main' : 'transparent',
						'&:hover': {
							background: 'rgba(0, 102, 255, 0.1)',
						}
					}}
				>
					<ListItemIcon
						sx={{
							minWidth: 0,
							mr: props.isFull ? 2 : 'auto',
							justifyContent: 'center',
							color: isActive() ? 'primary.main' : 'text.secondary',
							transition: 'color 0.2s ease',
						}}
					>
						{c()}
					</ListItemIcon>
					<ListItemText
						primary={props.text}
						sx={{
							display: props.isFull ? 'block' : 'none',
							'& .MuiTypography-root': {
								fontWeight: isActive() ? 600 : 400,
								color: isActive() ? 'primary.main' : 'text.primary',
							}
						}}
					/>
				</ListItemButton>
			</A>
		</ListItem>
	)
}

export default SideBarItem
