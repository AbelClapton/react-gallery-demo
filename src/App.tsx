import { Container, ImageList, ImageListItem } from '@mui/material'
import { Navbar, PhotoDetail, PhotoForm } from './components'
import { useEffect, useState } from 'react'
import { Photo } from './types/Photo.d'
import { v4 as uuidv4 } from 'uuid'

function App() {
	const [photos, setPhotos] = useState<Photo[]>(
		JSON.parse(localStorage.getItem('photos') || '[]')
	)
	const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
	const [showForm, setShowForm] = useState(false)
	const [showDetail, setShowDetail] = useState(false)

	const handleSavePhoto = (photo: Photo) => {
		photo.id
			? setPhotos(photos.map((p) => (p.id === photo.id ? photo : p)))
			: setPhotos([...photos, { ...photo, id: uuidv4() }])
	}

	const handleDeletePhoto = (photo: Photo) => {
		setPhotos(photos.filter((p) => p.id !== photo.id))
		setShowDetail(false)
	}

	const handleOpenForm = () => {
		setShowForm(true)
	}

	const handleCloseForm = () => {
		setShowForm(false)
	}

	const handleOpenDetail = (photo: Photo) => {
		setSelectedPhoto(photo)
		setShowDetail(true)
	}

	const handleCloseDetail = () => {
		setSelectedPhoto(null)
		setShowDetail(false)
	}

	// Save photos to local storage whenever they change
	useEffect(() => {
		localStorage.setItem('photos', JSON.stringify(photos))
	}, [photos])

	return (
		<>
			<Navbar onAddPhoto={handleOpenForm} />
			<Container fixed sx={{ p: 4 }} component="main">
				<ImageList
					gap={12}
					sx={{
						mb: 8,
						gridTemplateColumns:
							'repeat(auto-fill, minmax(250px, 1fr))!important',
					}}
				>
					{photos.map((photo) => (
						<ImageListItem
							key={photo.id}
							onClick={() => handleOpenDetail(photo)}
						>
							<img src={photo.url} alt={photo.title} loading="lazy" />
						</ImageListItem>
					))}
				</ImageList>
				{showForm && (
					<PhotoForm
						photo={selectedPhoto}
						open={showForm}
						onSubmit={handleSavePhoto}
						onClose={handleCloseForm}
					/>
				)}
				<PhotoDetail
					open={showDetail}
					photo={selectedPhoto}
					onEdit={handleOpenForm}
					onDelete={handleDeletePhoto}
					onClose={handleCloseDetail}
				/>
			</Container>
		</>
	)
}

export default App
