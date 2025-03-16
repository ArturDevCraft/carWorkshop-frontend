import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import classes from './Dialog.module.scss';

export default function Dialog({
	children,
	open,
	type,
	onConfirm,
	onReject,
	onClose,
}) {
	const dialog = useRef();

	const handleConfirm = () => {
		onConfirm && onConfirm();
		dialog.current.close();
	};

	const handleReject = () => {
		onReject && onReject();
		dialog.current.close();
	};
	const closeDialog = () => {
		dialog.current.close();
		onClose && onClose();
	};

	useEffect(() => {
		if (open) {
			dialog.current.showModal();
		}

		if (!open) {
			dialog.current.close();
		}
	}, [open]);

	return createPortal(
		<dialog ref={dialog} className={classes.dialog}>
			<p className={classes.closeBtn}>
				<a onClick={closeDialog}>x</a>
			</p>
			{children}
			{type === 'confirm' && (
				<p className={classes.action}>
					<button onClick={handleConfirm}>Ok</button>
					<button onClick={handleReject}>Cancel</button>
				</p>
			)}

			{type === 'ok' && (
				<p className={classes.action}>
					<button onClick={closeDialog}>Ok</button>
				</p>
			)}
		</dialog>,
		document.getElementById('modal')
	);
}
