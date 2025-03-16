import { createPortal } from 'react-dom';
import classes from './Notification.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import Dialog from './Dialog';

export default function Notification({ onClose }) {
	const [dialogIsOpen, setDialogIsOpen] = useState(false);
	const dispatch = useDispatch();
	const noticationContent = useSelector(
		(state) => state.ui.notificationContent
	);
	const handleClose = () => {
		setDialogIsOpen(false);
		dispatch(uiActions.hideNotification());
	};
	useEffect(() => {
		setDialogIsOpen(true);
		return () => {
			setDialogIsOpen(false);
		};
	}, []);

	return createPortal(
		<Dialog open={dialogIsOpen} onClose={handleClose} type="ok">
			<h2>{noticationContent.title}</h2>
			<div className={classes.content}>{noticationContent.msg}</div>
		</Dialog>,
		document.getElementById('modal')
	);
}
