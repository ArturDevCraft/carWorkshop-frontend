import { useDispatch } from 'react-redux';
import { deleteCar, getCarsData } from '../../store/cars-actions';
import classes from './DeleteCarButton.module.scss';
import Dialog from '../UI/Dialog';
import { useState } from 'react';
import { uiActions } from '../../store/ui-slice';

export default function DeleteCarButton({ carId }) {
	const dispatch = useDispatch();
	const [isDialogOpen, setDialogIsOpen] = useState(false);

	const deleteHandler = async () => {
		try {
			await deleteCar(carId);
			dispatch(getCarsData());
		} catch (error) {
			let msg;
			if (error instanceof TypeError) {
				msg = 'Network error: Server is down or address is incorrect.';
			} else {
				msg = 'Fetch error:' + error.message;
			}
			if (!error.errors) {
				dispatch(
					uiActions.showNotification({
						title: 'Connection problem!',
						msg: msg,
					})
				);
			}
		}
		setDialogIsOpen(false);
	};
	return (
		<>
			<button
				className={classes.actionBtn}
				onClick={() => setDialogIsOpen(true)}
			>
				Delete
			</button>
			<Dialog
				open={isDialogOpen}
				type="confirm"
				onConfirm={deleteHandler}
				onReject={() => setDialogIsOpen(false)}
			>
				<h2>Do you want delete this car?</h2>
			</Dialog>
		</>
	);
}
