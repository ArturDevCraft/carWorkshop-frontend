import { createPortal } from 'react-dom';
import classes from './Notification.module.scss';
import { useEffect, useRef } from 'react';

export default function Notification({ title, children, onClose }) {
	const dialog = useRef();
	const handleClose = () => {
		dialog.current.close();
	};
	useEffect(() => {
		const modal = dialog.current;
		modal.showModal();
		return () => {
			modal.close();
		};
	}, []);
	return createPortal(
		<dialog className={classes.modal} ref={dialog}>
			<h2>{title}</h2>
			<div className={classes.content}>{children}</div>
			<p className={classes.action}>
				<button onClick={handleClose}>Ok</button>
			</p>
		</dialog>,
		document.getElementById('modal')
	);
}
