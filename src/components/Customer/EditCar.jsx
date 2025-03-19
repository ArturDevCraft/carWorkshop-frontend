import { useActionState, useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from '../UI/Input';
import { getCarsData, updateCarData } from '../../store/cars-actions';
import classes from './EditCar.module.scss';
import Dialog from '../UI/Dialog';
import { uiActions } from '../../store/ui-slice';

export default function EditCar({ carData, carId }) {
	const [dialogIsOpen, setDialogIsOpen] = useState(false);
	const [formState, formAction] = useActionState(actionHandler, {
		enteredValues: carData,
		errors: null,
	});

	const dispatch = useDispatch();

	async function actionHandler(prevState, formData) {
		const carData = {
			make: formData.get('make'),
			model: formData.get('model'),
			vin: formData.get('vin'),
		};

		try {
			await updateCarData(carData, carId);
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

			return { errors: error.errors, enteredValues: carData };
		}

		setDialogIsOpen(false);
		dispatch(getCarsData());
		return { errors: null, enteredValues: carData };
	}

	const openDialog = () => {
		setDialogIsOpen(true);
	};

	return (
		<>
			<button className={classes.actionBtn} onClick={openDialog}>
				Edit
			</button>
			<Dialog open={dialogIsOpen} onClose={() => setDialogIsOpen(false)}>
				<h2>Add new car</h2>
				<form action={formAction} className={classes.form}>
					<Input
						name="make"
						type="text"
						placeholder="Make"
						defaultValue={formState.enteredValues?.make}
						errors={formState.errors?.make}
					/>
					<Input
						name="model"
						type="text"
						placeholder="Model"
						defaultValue={formState.enteredValues?.model}
						errors={formState.errors?.model}
					/>
					<Input
						name="vin"
						type="text"
						placeholder="VIN"
						defaultValue={formState.enteredValues?.vin}
						errors={formState.errors?.vin}
					/>
					<p className={classes.action}>
						<button type="submit">Save</button>
					</p>
				</form>
			</Dialog>
		</>
	);
}
