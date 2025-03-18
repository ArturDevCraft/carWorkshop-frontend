import { useActionState, useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from '../UI/Input';
import { getCarsData, sendCarData } from '../../store/cars-actions';
import { uiActions } from '../../store/ui-slice';
import classses from './NewCar.module.scss';
import Dialog from '../UI/Dialog';

export default function NewCar() {
	const [dialogIsOpen, setDialogIsOpen] = useState(false);
	const [formState, formAction] = useActionState(actionHandler, {
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
			await sendCarData(carData);
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

		dispatch(
			uiActions.showNotification({
				title: 'Car added!',
				msg: 'You can add new repair',
			})
		);
		dispatch(getCarsData());
		setDialogIsOpen(false);
		return { errors: null };
	}

	const openDialog = () => {
		setDialogIsOpen(true);
	};

	return (
		<>
			<button className={classses.newBtn} onClick={openDialog}>
				<p className={classses.icon}>
					<i className="fa-solid fa-plus"></i>
				</p>
				<p className={classses.text}>Add New Car</p>
			</button>
			<Dialog open={dialogIsOpen} onClose={() => setDialogIsOpen(false)}>
				<h2>Add new car</h2>
				<form action={formAction} className={classses.form}>
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
					<p className={classses.action}>
						<button type="submit">Add</button>
					</p>
				</form>
			</Dialog>
		</>
	);
}
