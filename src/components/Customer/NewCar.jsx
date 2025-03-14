import { useActionState } from 'react';
import { useDispatch } from 'react-redux';
import Input from '../UI/Input';
import { hasMinLength, isNotEmpty } from '../../util/validation';
import { getCarsData, sendCarData } from '../../store/cars-actions';
import { uiActions } from '../../store/ui-slice';

export default function NewCar() {
	const [formState, formAction] = useActionState(actionHandler, {
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
			await dispatch(sendCarData(carData));
			dispatch(
				uiActions.showNotification({
					title: 'Car added!',
					msg: 'You can add new repair',
				})
			);
			dispatch(getCarsData());
			//get new cars from backend
			return { errors: null };
		} catch (err) {
			const errMsg = await err.json();

			return { errors: errMsg.errors, enteredValues: carData };
		}
	}

	return (
		<>
			<h2>Add new car</h2>
			<form action={formAction}>
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
				<button type="submit">Add</button>
			</form>
		</>
	);
}
