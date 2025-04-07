import { useActionState, useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from '../UI/Input';
import { getCarsData, sendCarData } from '../../store/cars-actions';
import { uiActions } from '../../store/ui-slice';
import classes from './NewCar.module.scss';
import Dialog from '../UI/Dialog';
import ImageLoader from '../UI/ImageLoader';

export default function NewCar() {
	const [dialogIsOpen, setDialogIsOpen] = useState(false);
	const [formState, formAction] = useActionState(actionHandler, {
		errors: null,
	});
	const [imageUploadFn, setImageUploadFn] = useState(null);
	const [resetKey, setResetKey] = useState(0);

	const dispatch = useDispatch();

	async function actionHandler(prevState, formData) {
		const imageUrl = await imageUploadFn();
		const carData = {
			make: formData.get('make'),
			model: formData.get('model'),
			vin: formData.get('vin'),
			imageUrl: imageUrl || formData.get('imageUrl'),
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
		setResetKey((prevKey) => prevKey + 1);
		return { errors: null };
	}

	const openDialog = () => {
		setDialogIsOpen(true);
	};

	return (
		<>
			<button className={classes.newBtn} onClick={openDialog}>
				<p className={classes.icon}>
					<i className="fa-solid fa-plus"></i>
				</p>
				<p className={classes.text}>Add New Car</p>
			</button>
			<Dialog open={dialogIsOpen} onClose={() => setDialogIsOpen(false)}>
				<h2>Add new car</h2>
				<form action={formAction} className={classes.form}>
					<ImageLoader
						key={resetKey}
						name="imageUrl"
						placeholder="Upload file or paste file url"
						upload={setImageUploadFn}
						defaultValue={formState.enteredValues?.imageUrl}
					/>
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
						<button type="submit">Add</button>
					</p>
				</form>
			</Dialog>
		</>
	);
}
