import { useDispatch } from 'react-redux';
import { deleteCar, getCarsData } from '../../store/cars-actions';
import classes from './DeleteCarButton.module.scss';
import Dialog from '../UI/Dialog';
import { useState } from 'react';

export default function DeleteCarButton({ carId }) {
	const dispatch = useDispatch();
	const [isDialogOpen, setDialogIsOpen] = useState(false);

	const deleteHandler = async () => {
		try {
			await deleteCar(carId);
			dispatch(getCarsData());
		} catch (err) {
			const errMsg = await err.json();

			return { errors: errMsg.errors };
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
