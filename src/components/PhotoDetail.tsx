import { FC } from 'react'
import { Photo } from '../types/Photo.d'
import {
	Box,
	Container,
	Grid,
	IconButton,
	Modal,
	Typography,
} from '@mui/material'
import { Clear, Create, Delete } from '@mui/icons-material'

type Props = {
	open: boolean
	photo: Photo | null
	onEdit: (photo: Photo) => void
	onDelete: (photo: Photo) => void
	onClose: () => void
}

const PhotoDetail: FC<Props> = ({ open, photo, onEdit, onDelete, onClose }) => {
	return (
		<>
			<Modal
				open={open}
				style={{
					backdropFilter: 'blur(5px)',
					backgroundColor: 'rgba(0,0,0,0.8)',
				}}
			>
				<>
					<Box textAlign="end">
						<IconButton
							onClick={() => photo && onEdit(photo)}
							style={{ color: 'white' }}
						>
							<Create />
						</IconButton>
						<IconButton
							onClick={() => photo && onDelete(photo)}
							style={{ color: 'white' }}
						>
							<Delete />
						</IconButton>
						<IconButton onClick={onClose} style={{ color: 'white' }}>
							<Clear />
						</IconButton>
					</Box>
					<Container
						fixed
						style={{
							height: '100%',
						}}
					>
						<Grid
							container
							columns={{ xs: 1, md: 3 }}
							style={{ height: '100%' }}
							paddingTop={6}
						>
							<Grid item xs={1} md={2} justifyContent="center">
								<img src={photo?.url} alt="" />
							</Grid>
							<Grid item xs={1} md={1}>
								<Box component="section" marginBottom={4}>
									<Typography variant="h6" color="white">
										Title
									</Typography>
									<Typography color="darkgray">{photo?.title}</Typography>
								</Box>
								<Box component="section">
									<Typography variant="h6" color="white">
										Description
									</Typography>
									<Typography color="darkgray">{photo?.description}</Typography>
								</Box>
							</Grid>
						</Grid>
					</Container>
				</>
			</Modal>
		</>
	)
}

export default PhotoDetail
