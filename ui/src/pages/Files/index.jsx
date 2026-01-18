import { useBeforeLeave, useNavigate, useParams } from '@solidjs/router'
import { Show, createSignal, mapArray, onCleanup, onMount, createMemo } from 'solid-js'
import List from '@suid/material/List'
import MenuItem from '@suid/material/MenuItem'
import ListItemIcon from '@suid/material/ListItemIcon'
import ListItemText from '@suid/material/ListItemText'
import UploadFileIcon from '@suid/icons-material/UploadFile'
import UploadFolderIcon from '@suid/icons-material/DriveFolderUpload'
import FolderOpenIcon from '@suid/icons-material/FolderOpen'
import LockIcon from '@suid/icons-material/Lock'
import SearchIcon from '@suid/icons-material/Search'
import CloudUploadIcon from '@suid/icons-material/CloudUpload'
import Grid from '@suid/material/Grid'
import Stack from '@suid/material/Stack'
import Typography from '@suid/material/Typography'
import Divider from '@suid/material/Divider'
import Fab from '@suid/material/Fab'
import ToggleButton from '@suid/material/ToggleButton'
import ToggleButtonGroup from '@suid/material/ToggleButtonGroup'
import AddIcon from '@suid/icons-material/Add'
import TextField from '@suid/material/TextField'
import InputAdornment from '@suid/material/InputAdornment'
import Box from '@suid/material/Box'
import Paper from '@suid/material/Paper'

import API from '../../api'
import FSListItem from '../../components/FSListItem'
import Menu from '../../components/Menu'
import CreateFolderDialog from '../../components/CreateFolderDialog'
import { alertStore } from '../../components/AlertStack'
import Access from '../../components/Access'
import GrantAccess from '../../components/GrantAccess'

const Files = () => {
	const { addAlert } = alertStore
	/**
	 * @type {[import("solid-js").Accessor<import("../../api").FSElement[]>, any]}
	 */
	const [fsLayer, setFsLayer] = createSignal([])
	/**
	 * @type {[import("solid-js").Accessor<import("../../api").Storage>, any]}
	 */
	const [storage, setStorage] = createSignal()
	const [isAccessPage, setIsAccessPage] = createSignal(false)
	const [isCreateFolderDialogOpen, setIsCreateFolderDialogOpen] =
		createSignal(false)
	const [isGrantAccessButtonVisible, setIsGrantButtonAccessVisible] =
		createSignal(false)
	const [isGrantAccessVisible, setIsGrantAccessVisible] = createSignal(false)
	const [searchQuery, setSearchQuery] = createSignal('')
	const [isDragging, setIsDragging] = createSignal(false)
	const [isUploading, setIsUploading] = createSignal(false)
	/**
	 * @type {[import("solid-js").Accessor<import("../api").UserWithAccess[]>, any]}
	 */
	const [users, setUsers] = createSignal([])
	const navigate = useNavigate()
	const params = useParams()
	const basePath = `/storages/${params.id}/files`

	let uploadFileInputElement
	let dropZoneRef

	// Filtered files based on search
	const filteredFsLayer = createMemo(() => {
		const query = searchQuery().toLowerCase()
		if (!query) return fsLayer()
		return fsLayer().filter(item =>
			item.name.toLowerCase().includes(query)
		)
	})

	const fetchUsersWithAccess = async () => {
		try {
			const users = await API.access.listUsersWithAccess(params.id)
			setUsers(users)
			setIsGrantButtonAccessVisible(true)
		} catch (err) {
			addAlert('You do not have permissions to manage access', 'error')
			console.error(err)
			setIsGrantButtonAccessVisible(false)
		}
	}

	const fetchStorage = async () => {
		const storage = await API.storages.getStorage(params.id)
		setStorage(storage)
	}

	const fetchFSLayer = async (path = params.path) => {
		const fsLayerRes = await API.files.getFSLayer(params.id, path)

		if (path.length) {
			const parentPath = path.split('/').slice(0, -1).join('/')
			const backToParent = { is_file: false, name: '..', path: parentPath }

			fsLayerRes.splice(0, 0, backToParent)
		}

		setFsLayer(fsLayerRes)
	}

	const reload = async () => {
		if (window.location.pathname.startsWith(basePath)) {
			console.log(window.location.pathname)
			await fetchFSLayer()
		}
	}

	onMount(() => {
		Promise.all([fetchStorage(), fetchFSLayer()]).then()

		// Either me or the solidjs-router creator is dumb af so I have to use this sht
		window.addEventListener('popstate', reload, false)
	})

	onCleanup(() => window.removeEventListener('popstate', reload, false))

	useBeforeLeave(async (e) => {
		if (e.to.startsWith(basePath)) {
			let newPath = e.to.slice(basePath.length)

			if (newPath.startsWith('/')) {
				newPath = newPath.slice(1)
			}

			await fetchFSLayer(newPath)
		}
	})

	const openCreateFolderDialog = () => {
		setIsCreateFolderDialogOpen(true)
	}
	const closeCreateFolderDialog = () => {
		setIsCreateFolderDialogOpen(false)
	}

	/**
	 *
	 * @param {string} folderName
	 */
	const createFolder = async (folderName) => {
		const basePath = params.path.endsWith('/')
			? params.path.slice(0, -1)
			: params.path

		await API.files.createFolder(params.id, basePath, folderName)
		addAlert(`Created folder "${folderName}"`, 'success')
		await fetchFSLayer()
	}

	const uploadFileClickHandler = () => {
		uploadFileInputElement.click()
	}

	/**
	 *
	 * @param {Event} event
	 */
	const uploadFile = async (event) => {
		const file = event.target.files[0]
		if (file === undefined) {
			return
		}

		event.target.value = null
		setIsUploading(true)

		try {
			await API.files.uploadFile(params.id, params.path, file)
			addAlert(`Uploaded file "${file.name}"`, 'success')
			await fetchFSLayer()
		} catch (err) {
			addAlert(`Failed to upload "${file.name}"`, 'error')
		} finally {
			setIsUploading(false)
		}
	}

	// Drag and Drop handlers
	const handleDragEnter = (e) => {
		e.preventDefault()
		e.stopPropagation()
		setIsDragging(true)
	}

	const handleDragLeave = (e) => {
		e.preventDefault()
		e.stopPropagation()
		setIsDragging(false)
	}

	const handleDragOver = (e) => {
		e.preventDefault()
		e.stopPropagation()
	}

	const handleDrop = async (e) => {
		e.preventDefault()
		e.stopPropagation()
		setIsDragging(false)

		const files = e.dataTransfer.files
		if (files.length === 0) return

		setIsUploading(true)

		try {
			for (let i = 0; i < files.length; i++) {
				const file = files[i]
				await API.files.uploadFile(params.id, params.path, file)
				addAlert(`Uploaded file "${file.name}"`, 'success')
			}
			await fetchFSLayer()
		} catch (err) {
			addAlert('Failed to upload some files', 'error')
		} finally {
			setIsUploading(false)
		}
	}

	return (
		<>
			<Stack
				container
				ref={dropZoneRef}
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				sx={{ position: 'relative', minHeight: '80vh' }}
			>
				{/* Drag Overlay */}
				<Show when={isDragging()}>
					<Box sx={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: 'rgba(0, 102, 255, 0.1)',
						border: '3px dashed #0066FF',
						borderRadius: 2,
						zIndex: 1000,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
						gap: 2,
					}}>
						<CloudUploadIcon sx={{ fontSize: 64, color: '#0066FF' }} />
						<Typography variant="h5" color="primary">
							Drop files here to upload
						</Typography>
					</Box>
				</Show>

				{/* Uploading Overlay */}
				<Show when={isUploading()}>
					<Box sx={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						zIndex: 1001,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
						gap: 2,
					}}>
						<Typography variant="h5" sx={{ color: 'white' }}>
							Uploading...
						</Typography>
					</Box>
				</Show>

				<Grid container sx={{ mb: 2 }}>
					<Grid item xs={4}>
						<Typography variant="h4">{storage()?.name}</Typography>
					</Grid>

					<Grid item xs={4}>
						<ToggleButtonGroup
							exclusive
							value={isAccessPage()}
							color="primary"
							onChange={(_, val) => setIsAccessPage(val)}
							sx={{ display: 'flex', justifyContent: 'center' }}
						>
							<ToggleButton value={false}>
								<FolderOpenIcon fontSize="small" />
								&nbsp; Files
							</ToggleButton>
							<ToggleButton value={true}>
								<LockIcon fontSize="small" />
								&nbsp; Access
							</ToggleButton>
						</ToggleButtonGroup>
					</Grid>

					<Grid
						item
						xs={4}
						sx={{ display: 'flex', justifyContent: 'flex-end' }}
					>
						<Show
							when={!isAccessPage()}
							fallback={
								<Show when={isGrantAccessButtonVisible()}>
									<Fab
										variant="extended"
										color="secondary"
										onClick={() => setIsGrantAccessVisible(true)}
									>
										<AddIcon sx={{ mr: 1 }} />
										Grant access
									</Fab>
									<GrantAccess
										isVisible={isGrantAccessVisible()}
										afterGrant={fetchUsersWithAccess}
										onClose={() => setIsGrantAccessVisible(false)}
									/>
								</Show>
							}
						>
							<Menu button_title="Create">
								<MenuItem onClick={openCreateFolderDialog}>
									<ListItemIcon>
										<UploadFolderIcon />
									</ListItemIcon>
									<ListItemText>Create folder</ListItemText>
								</MenuItem>
								<MenuItem onClick={uploadFileClickHandler}>
									<ListItemIcon>
										<UploadFileIcon />
									</ListItemIcon>
									<ListItemText>Upload file</ListItemText>
								</MenuItem>
								<MenuItem
									onClick={() => navigate(`/storages/${params.id}/upload_to`)}
								>
									<ListItemIcon>
										<UploadFileIcon />
									</ListItemIcon>
									<ListItemText>Upload file to</ListItemText>
								</MenuItem>
							</Menu>
						</Show>
					</Grid>
				</Grid>

				<Show
					when={!isAccessPage()}
					fallback={
						<Access
							setIsGrantAccessVisible={setIsGrantAccessVisible}
							users={users()}
							onMount={fetchUsersWithAccess}
							refetchUsers={fetchUsersWithAccess}
						/>
					}
				>
					{/* Search Bar */}
					<Box sx={{ maxWidth: 540, mx: 'auto', mb: 2 }}>
						<TextField
							fullWidth
							placeholder="Search files..."
							variant="outlined"
							size="small"
							value={searchQuery()}
							onInput={(e) => setSearchQuery(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								),
							}}
						/>
					</Box>

					{/* Drag & Drop hint */}
					<Box sx={{ maxWidth: 540, mx: 'auto', mb: 2 }}>
						<Paper
							variant="outlined"
							sx={{
								p: 2,
								textAlign: 'center',
								borderStyle: 'dashed',
								backgroundColor: 'transparent',
							}}
						>
							<CloudUploadIcon sx={{ fontSize: 32, color: 'text.secondary', mb: 1 }} />
							<Typography variant="body2" color="text.secondary">
								Drag & drop files here or use the upload button
							</Typography>
						</Paper>
					</Box>

					<Grid>
						<Show when={filteredFsLayer().length} fallback={
							<Box sx={{ textAlign: 'center', py: 4 }}>
								<Typography color="text.secondary">
									{searchQuery() ? 'No files match your search' : 'No files yet'}
								</Typography>
							</Box>
						}>
							<List sx={{ minWidth: 320, maxWidth: 540, mx: 'auto' }}>
								<Divider />
								{mapArray(filteredFsLayer, (fsElement) => (
									<>
										<FSListItem
											fsElement={fsElement}
											storageId={params.id}
											onDelete={fetchFSLayer}
										/>
										<Divider />
									</>
								))}
							</List>
						</Show>
					</Grid>

					<CreateFolderDialog
						isOpened={isCreateFolderDialogOpen()}
						onCreate={createFolder}
						onClose={closeCreateFolderDialog}
					/>
					<input
						ref={uploadFileInputElement}
						type="file"
						style="display: none"
						onChange={uploadFile}
					/>
				</Show>
			</Stack>
		</>
	)
}

export default Files
