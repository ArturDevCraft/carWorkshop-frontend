import { createPortal } from 'react-dom';
import classes from './Notification.module.scss';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/ui-slice';

export default function Notification({ onClose }) {
	const dispatch = useDispatch();
	const noticationContent = useSelector(
		(state) => state.ui.notificationContent
	);
	const dialog = useRef();
	const handleClose = () => {
		dialog.current.close();
		dispatch(uiActions.hideNotification());
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
			<h2>{noticationContent.title}</h2>
			<div className={classes.content}>{noticationContent.msg}</div>
			<p className={classes.action}>
				<button onClick={handleClose}>Ok</button>
			</p>
		</dialog>,
		document.getElementById('modal')
	);
}
