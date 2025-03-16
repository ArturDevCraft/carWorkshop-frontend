import { useActionState, useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from '../UI/Input';
import { hasMinLength, isNotEmpty } from '../../util/validation';
import { getCarsData, updateCarData } from '../../store/cars-actions';
import classses from './NewCar.module.scss';
import Dialog from '../UI/Dialog';

export default function EditCar({ carData, carId }) {
	const [dialogIsOpen, setDialogIsOpen] = useState(false);
	const [formState, formAction] = useActionState(actionHandler, {
		enteredValues: carData,
		errors: null,
	});

	const dispatch = useDispatch();

	async function actionHandler(prevState, formData) {
		let errors = {
			make: null,
			model: null,
			vin: null,
		};

		const carData = {
			make: formData.get('make'),
			model: formData.get('model'),
			vin: formData.get('vin'),
		};

		if (!isNotEmpty(carData.make)) {
			errors.make = 'You must provide make';
		}
		if (!isNotEmpty(carData.model)) {
			errors.model = 'You must provide model';
		}
		if (!hasMinLength(carData.vin, 17)) {
			errors.vin = 'Vin must have 17 characters';
		}

		if (errors.make !== null || errors.model !== null || errors.vin !== null) {
			return { errors, enteredValues: carData };
		}

		try {
			await updateCarData(carData, carId);
			dispatch(getCarsData());
			setDialogIsOpen(false);
			return { errors: null };
		} catch (err) {
			const errMsg = await err.json();

			return { errors: errMsg.errors, enteredValues: carData };
		}
	}

	const openDialog = () => {
		setDialogIsOpen(true);
	};

	return (
		<>
			<button className={classses.newBtn} onClick={openDialog}>
				Edit
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
						<button type="submit">Save</button>
					</p>
				</form>
			</Dialog>
		</>
	);
}
