import classes from './Signup.module.scss';
import { useActionState } from 'react';
import { useDispatch } from 'react-redux';
import { sendSignupData } from '../../store/auth-actions.js';
import Input from '../UI/Input.jsx';
import SignupToggleButton from '../UI/SignupToggleButton.jsx';
import Select from '../UI/Select.jsx';
import { uiActions } from '../../store/ui-slice.js';

export default function Signup() {
	const [formState, formAction, isPending] = useActionState(signupAction, {
		errors: null,
	});
	const dispatch = useDispatch();

	async function signupAction(prevFormState, formData) {
		const userData = {
			email: formData.get('email'),
			password: formData.get('password'),
			passwordConfirm: formData.get('passwordConfirm'),
			name: formData.get('name'),
			role: formData.get('role'),
		};

		try {
			await sendSignupData(userData);
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
			return { errors: error.errors, enteredValues: userData };
		}
		dispatch(
			uiActions.showNotification({
				title: 'User created!',
				msg: 'You can login',
			})
		);
		dispatch(uiActions.toggleLogin());
		return { errors: null };
	}

	return (
		<div className={classes.login}>
			<h2>Create new account</h2>
			<form action={formAction} noValidate>
				<Input
					name="email"
					type="email"
					placeholder="E-mail"
					defaultValue={formState.enteredValues?.email}
					errors={formState.errors?.email}
				/>

				<Input
					name="password"
					type="password"
					placeholder="Password"
					defaultValue={formState.enteredValues?.password}
					errors={formState.errors?.password}
				/>
				<Input
					name="passwordConfirm"
					type="password"
					placeholder="Confirm password"
					defaultValue={formState.enteredValues?.passwordConfirm}
					errors={formState.errors?.passwordConfirm}
				/>
				<Input
					name="name"
					type="text"
					placeholder="Name"
					defaultValue={formState.enteredValues?.name}
					errors={formState.errors?.name}
				/>

				<Select
					options={[
						{ value: 'customer', text: 'Customer' },
						{ value: 'workshop', text: 'Workshop administrator' },
					]}
					name="role"
					defaultValue={formState.enteredValues?.role}
					errors={formState.errors?.role}
				/>

				<button className={classes.button} type="submit">
					SIGNUP
				</button>
			</form>
			<p>
				Do You have an account? <SignupToggleButton>Login!</SignupToggleButton>
			</p>
		</div>
	);
}
