import classes from './ImageLoader.module.scss';

import { useEffect, useRef, useState } from 'react';
import supabase from '../../../supabaseClient';

export default function ImageLoader({ name, placeholder, upload }) {
	const [file, setFile] = useState(null);
	const [filePreview, setFilePreview] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [fileUrl, setFileUrl] = useState('');
	const imageInput = useRef();
	const urlInput = useRef();

	const handleFileChange = (e) => {
		const pickedFile = e.target.files[0];
		if (!pickedFile) {
			setFile(null);
			return;
		}
		setFile(pickedFile);

		const fileReader = new FileReader();
		fileReader.onload = () => {
			setFilePreview(fileReader.result);
		};
		fileReader.readAsDataURL(pickedFile);
	};

	const handleUpload = async () => {
		if (!file) return null;
		setUploading(true);
		const filePath = `${Date.now()}-${file.name}`;

		const { data, error } = await supabase.storage
			.from('images')
			.upload(filePath, file);

		if (error) {
			console.error('Upload error:', error.message);
			setUploading(false);
			alert('Upload failed!');
		} else {
			const { data: urlData } = supabase.storage
				.from('images')
				.getPublicUrl(filePath);
			setFileUrl(urlData.publicUrl);
			setUploading(false);
			return urlData.publicUrl;
		}
	};
	const handleReset = () => {
		imageInput.current.value = '';
		urlInput.current.value = '';
		setFilePreview(null);
		setFile(null);
	};

	useEffect(() => {
		upload(() => handleUpload);
		return;
	}, [upload, file]);

	const handlePickClick = () => {
		imageInput.current.click();
	};

	return (
		<div className={classes.picker}>
			<input
				ref={imageInput}
				className={classes.file}
				type="file"
				onChange={handleFileChange}
			/>
			<div className={classes.preview}>
				{filePreview && <img src={filePreview} alt="Image selected by user" />}
			</div>
			<button
				className={classes.button}
				type="button"
				onClick={handlePickClick}
				disabled={uploading}
			>
				{uploading ? 'Uploading...' : 'Pick an Image'}
			</button>
			<button className={classes.button} type="button" onClick={handleReset}>
				Reset
			</button>
			<input
				ref={urlInput}
				type="text"
				name={name}
				id={name}
				defaultValue={fileUrl}
				placeholder={placeholder}
			/>
		</div>
	);
}
