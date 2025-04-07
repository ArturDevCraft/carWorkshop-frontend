import { useActionState, useState } from 'react';
import Dialog from '../UI/Dialog';
import Input from '../UI/Input';
import classes from './NewRepair.module.scss';

export default function NewRepair() {
	const [dialogIsOpen, setDialogIsOpen] = useState(false);
	const [formState, formAction] = useActionState(actionHandler, {
		errors: null,
	});
	async function actionHandler(prevState, formData) {
		const repairData = {
			title: formData.get('title'),
		};
		return { errors: error.erros, enteredValues: repairData };
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
				<p className={classes.text}>Order New Repair</p>
			</button>
			<Dialog open={dialogIsOpen} onClose={() => setDialogIsOpen(false)}>
				<h2>Order new repair</h2>
				<form action={formAction} className={classes.form}>
					<Input
						name="title"
						type="text"
						placeholder="Repair title"
						defaultValue={formState.enteredValues?.title}
						errors={formState.errors?.title}
					/>
					<Input
						name="description"
						type="textarea"
						placeholder="Description of the defect"
						defaultValue={formState.enteredValues?.description}
						errors={formState.errors?.description}
					/>
					<p className={classes.action}>
						<button type="submit">Place order</button>
					</p>
				</form>
			</Dialog>
		</>
	);
}
