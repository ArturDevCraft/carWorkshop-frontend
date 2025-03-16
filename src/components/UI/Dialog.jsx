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
		onConfirm();
	};

	const handleReject = () => {
		onReject();
	};
	const closeDialog = () => {
		dialog.current.close();
		onClose();
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
			<a className={classes.closeBtn} onClick={closeDialog}>
				x
			</a>
			{children}
			{type === 'confirmation' && (
				<p className={classes.action}>
					<button onClick={handleConfirm}>Ok</button>
					<button onClickl={handleReject}>Cancel</button>
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
