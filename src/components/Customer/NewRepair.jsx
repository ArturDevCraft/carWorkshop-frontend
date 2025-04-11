import { useActionState, useState } from 'react';
import Dialog from '../UI/Dialog';
import Input from '../UI/Input';
import classes from './NewRepair.module.scss';
import CarPicker from '../UI/CarPicker';
import { useDispatch } from 'react-redux';
import { sendRepairData } from '../../store/repairs.action';
import { uiActions } from '../../store/ui-slice';

export default function NewRepair() {
	const dispatch = useDispatch();
	const [dialogIsOpen, setDialogIsOpen] = useState(false);
	const [formState, formAction] = useActionState(actionHandler, {
		errors: null,
	});

	async function actionHandler(prevState, formData) {
		const repairData = {
			carId: formData.get('carId'),
			description: formData.get('description'),
			information: formData.get('information'),
		};

		try {
			await dispatch(sendRepairData(repairData));
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
			return { errors: error.errors, enteredValues: repairData };
		}

		setDialogIsOpen(false);
		return { errors: null };
	}

	const openDialog = () => {
		setDialogIsOpen(true);
	};

	const handleClose = () => {
		setDialogIsOpen(false);
	};

	return (
		<>
			<button className={classes.newBtn} onClick={openDialog}>
				<p className={classes.icon}>
					<i className="fa-solid fa-plus"></i>
				</p>
				<p className={classes.text}>Order New Repair</p>
			</button>
			{dialogIsOpen && (
				<Dialog open={dialogIsOpen} onClose={handleClose}>
					<h2>Order new repair</h2>
					<form action={formAction} className={classes.form}>
						<CarPicker
							name="carId"
							defaultValue={formState.enteredValues?.carId}
							errors={formState.errors?.carId}
							placeHolder="Select a car"
						/>
						<Input
							name="description"
							type="textarea"
							placeholder="Description of the defect"
							defaultValue={formState.enteredValues?.description}
							errors={formState.errors?.description}
						/>
						<Input
							name="information"
							type="text"
							placeholder="Additional information"
							defaultValue={formState.enteredValues?.information}
							errors={formState.errors?.information}
						/>
						<p className={classes.action}>
							<button type="submit">Place order</button>
						</p>
					</form>
				</Dialog>
			)}
		</>
	);
}
