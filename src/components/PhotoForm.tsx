import { FC, useState } from 'react'
import {
	Dialog,
	TextField,
	Stack,
	Button,
	DialogTitle,
	DialogContent,
	DialogActions,
	Stepper,
	Step,
	StepLabel,
	StepContent,
} from '@mui/material'
import { FileUploader } from '.'
import { type Photo } from '../types/Photo.d'

type Props = {
	photo: Photo | null
	open: boolean
	onSubmit: (photo: Photo) => void
	onClose: () => void
}

const PhotoForm: FC<Props> = ({ open, photo, onSubmit, onClose }) => {
	//#region state
	const [file, setFile] = useState(photo ? photo.url : '')
	const [title, setTitle] = useState(photo ? photo.title : '')
	const [description, setDescription] = useState(photo ? photo.description : '')
	//#endregion state

	//#region handlers
	const handleSubmit = () => {
		onSubmit({ ...photo, url: file, title, description })
		onClose()
	}
	//#endregion

	//#region stepper
	const [step, setStep] = useState(photo ? 1 : 0)

	const handleBack = () => {
		setStep(step - 1)
	}

	const handleNext = () => {
		step ? handleSubmit() : setStep(step + 1)
	}
	//#endregion

	//#region template
	return (
		<>
			<Dialog
				open={open}
				onClose={onClose}
				disablePortal
				style={{ zIndex: 2000 }}
			>
				<DialogTitle>Add Photo</DialogTitle>
				<DialogContent dividers>
					<Stepper activeStep={step} orientation="vertical">
						<Step key={0}>
							<StepLabel>Upload Photo</StepLabel>
							<StepContent>
								<FileUploader file={file} onUpload={setFile} />
							</StepContent>
						</Step>
						<Step key={1}>
							<StepLabel>Photo Details</StepLabel>
							<StepContent>
								<Stack spacing={2} sx={{ py: 2, width: 300 }}>
									<TextField
										label="Title"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
									/>
									<TextField
										label="Description"
										value={description}
										multiline
										minRows={3}
										onChange={(e) => setDescription(e.target.value)}
									/>
								</Stack>
							</StepContent>
						</Step>
					</Stepper>
				</DialogContent>
				<DialogActions>
					<Button color="inherit" disabled={!step} onClick={handleBack}>
						Back
					</Button>
					<Button onClick={handleNext}>{step ? 'Save' : 'Next'}</Button>
				</DialogActions>
			</Dialog>
		</>
	)
	//#endregion
}

export default PhotoForm
