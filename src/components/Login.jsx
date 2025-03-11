import classes from './Login.module.scss';
import { useActionState } from 'react';
import { useDispatch } from 'react-redux';
import { sendAuthData } from '../store/auth-actions';
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation.js';
import Input from './Input.jsx';
import { uiActions } from '../store/ui-slice.js';
import SignupToggleButton from './SignupToggleButton.jsx';

export default function Login() {
	const [formState, formAction, isPending] = useActionState(loginAction, {
		errors: null,
	});
	const dispatch = useDispatch();

	async function loginAction(prevFormState, formData) {
		let errors = { email: null, password: null };

		const email = formData.get('email');
		const password = formData.get('password');

		if (!isEmail(email)) {
			errors.email = 'Invalid email address.';
		}

		if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
			errors.password =
				'You must provide a password with at least six characters.';
		}

		if (errors.email.length > 0 || errors.password.length > 0) {
			return { errors, enteredValues: { email, password } };
		}

		try {
			await dispatch(sendAuthData(email, password));
			return { errors: null };
		} catch (err) {
			errors.password = 'Invalid email or password.';
			errors.email = 'Invalid email or password.';
			return { errors, enteredValues: { email, password } };
		}
	}

	return (
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
	);
}
