import { useActionState, useEffect } from 'react';
import classes from './UserAccount.module.scss';
import { getLoggedUserData } from '../../store/user-actions';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../UI/Input';

export default function UserAccount() {
	const dispatch = useDispatch();
	const userRole = useSelector((state) => state.user.role);
	const userName = useSelector((state) => state.user.name);
	const userEmail = useSelector((state) => state.user.email);
	const [formState, formAction] = useActionState(actionHandler, {
		enteredValues: {
			name: userName,
			email: userEmail,
			oldpassword: null,
			newpassword: null,
			confirmpassword: null,
		},
		errors: null,
	});

	useEffect(() => {
		dispatch(getLoggedUserData());
	}, []);

	function actionHandler(prevState, formData) {
		const userData = {
			name: formData.get('name'),
			email: formData.get('email'),
			oldpassword: formData.get('oldpassword'),
			newpassword: formData.get('newpassword'),
			confirmpassword: formData.get('confirmpassword'),
		};
        try {
            
        } catch (error) {
            
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
				name="oldpassword"
				type="password"
				placeholder="Old password"
				defaultValue={formState.enteredValues?.oldpassword}
				errors={formState.errors?.oldpassword}
			/>
			<Input
				label="New password"
				name="newpassword"
				type="password"
				placeholder="New password"
				defaultValue={formState.enteredValues?.newpassword}
				errors={formState.errors?.newpassword}
			/>
			<Input
				label="Confirm password"
				name="confirmpassword"
				type="password"
				placeholder="Confirm password"
				defaultValue={formState.enteredValues?.confirmpassword}
				errors={formState.errors?.confirmpassword}
			/>
			<p className={classes.action}>
				<button type="submit">Save</button>
			</p>
		</form>
	);
}
