import { useActionState, useEffect } from 'react';
import classes from './UserAccount.module.scss';
import { getLoggedUserData, updateUserData } from '../../store/user-actions';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../UI/Input';

export default function UserAccount() {
	const dispatch = useDispatch();
	const userName = useSelector((state) => state.user.name);
	const userEmail = useSelector((state) => state.user.email);
	const [formState, formAction] = useActionState(actionHandler, {
		enteredValues: {
			name: userName,
			email: userEmail,
			oldPassword: null,
			newPassword: null,
			confirmPassword: null,
		},
		errors: null,
	});

	useEffect(() => {
		dispatch(getLoggedUserData());
	}, []);

	async function actionHandler(prevState, formData) {
		const userData = {
			name: formData.get('name'),
			email: formData.get('email'),
			oldPassword: formData.get('oldPassword'),
			newPassword: formData.get('newPassword'),
			confirmPassword: formData.get('confirmPassword'),
		};

		try {
			await updateUserData(userData);
		} catch (error) {
			return { enteredValues: userData, errors: error.errors };
		}

		return { enteredValues: userData, errors: null };
	}
	return (
		<form action={formAction} className={classes.form}>
			<h2>User Account</h2>
			<Input
				label="Name"
				name="name"
				type="text"
				placeholder="Name"
				defaultValue={formState.enteredValues?.name}
				errors={formState.errors?.name}
			/>
			<Input
				label="E-mail"
				name="email"
				type="email"
				placeholder="E-mail"
				defaultValue={formState.enteredValues?.email}
				errors={formState.errors?.email}
			/>
			<Input
				label="Old password"
				name="oldPassword"
				type="password"
				placeholder="Old password"
				defaultValue={formState.enteredValues?.oldPassword}
				errors={formState.errors?.oldPassword}
			/>
			<Input
				label="New password"
				name="newPassword"
				type="password"
				placeholder="New password"
				defaultValue={formState.enteredValues?.newPassword}
				errors={formState.errors?.newPassword}
			/>
			<Input
				label="Confirm password"
				name="confirmPassword"
				type="password"
				placeholder="Confirm password"
				defaultValue={formState.enteredValues?.confirmPassword}
				errors={formState.errors?.confirmPassword}
			/>
			<p className={classes.action}>
				<button type="submit">Save</button>
			</p>
		</form>
	);
}
