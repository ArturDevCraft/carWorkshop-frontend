import classes from './Login.module.scss';
import { useActionState } from 'react';
import { useDispatch } from 'react-redux';
import { sendAuthData } from '../../store/auth-actions.js';
import Input from '../UI/Input.jsx';
import { uiActions } from '../../store/ui-slice.js';
import SignupToggleButton from '../UI/SignupToggleButton.jsx';

export default function Login() {
	const [formState, formAction, isPending] = useActionState(loginAction, {
		errors: null,
	});
	const dispatch = useDispatch();

	async function loginAction(prevFormState, formData) {
		const email = formData.get('email');
		const password = formData.get('password');

		try {
			await dispatch(sendAuthData(email, password));
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

			return { errors: error.errors, enteredValues: { email, password } };
		}
		return { errors: null };
	}

	return (
		<>
			<div className={classes.login}>
				<h2>Login to Car Repair Booking</h2>
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

					<button className={classes.button} type="submit">
						LOGIN
					</button>
				</form>
				<p>
					Don't have an account?
					<SignupToggleButton>Join us!</SignupToggleButton>
				</p>
			</div>
			<p>You can create new user or login to test account:</p>
			<br></br>
			<p>E-mail: aa@bb.cc</p>
			<p>Password: 123456</p>
		</>
	);
}
