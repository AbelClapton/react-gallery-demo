import { Box, IconButton, Typography } from '@mui/material'
import { FC, useRef, useState } from 'react'
import { Backup, Delete } from '@mui/icons-material'

type Props = {
	file: string
	onUpload: (content: string) => void
}

const FileUploader: FC<Props> = ({ file, onUpload }) => {
	const [filename, setFilename] = useState('')
	const input = useRef<HTMLInputElement>(null)

	const handleChange = (files: FileList | null) => {
		if (!files) return

		const file = files[0]

		if (file) {
			const reader = new FileReader()
			reader.onload = (event) => {
				onUpload(event.target?.result as string)
				setFilename(file.name)
			}

			reader.readAsDataURL(file)
		}
	}

	return (
		<>
			<Box
				sx={{
					p: 2,
					border: '1px dashed grey',
					height: 200,
					width: 300,
					borderRadius: 2,
					cursor: 'pointer',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					overflow: 'hidden',
				}}
				component="div"
				onClick={() => input.current?.click()}
			>
				<input
					ref={input}
					type="file"
					accept="image/*"
					hidden
					onChange={(e) => handleChange(e.target.files)}
				/>

				{file ? (
					<img src={file} alt="" style={{ objectFit: 'cover' }} width={300} />
				) : (
					<>
						<Backup color="primary" sx={{ fontSize: 60 }} />
						<Typography>Browse Files to Upload</Typography>
					</>
				)}
			</Box>
			{filename && (
				<Box
					component="section"
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						alignItems: 'center',
					}}
				>
					<Typography component="span">
						{filename}
						<IconButton
							aria-label="delete"
							onClick={() => {
								onUpload('')
								setFilename('')
							}}
						>
							<Delete color="error" />
						</IconButton>
					</Typography>
				</Box>
			)}
		</>
	)
}

export default FileUploader
