import classes from './Login.module.scss';
import { useActionState } from 'react';
import { useDispatch } from 'react-redux';
import { sendAuthData } from '../store/auth-actions';
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation.js';
import Input from './Input.jsx';

export default function Login() {
	const [formState, formAction, isPending] = useActionState(loginHandler, {
		errors: null,
	});
	const dispatch = useDispatch();

	function loginHandler(prevFormState, formData) {
		let errors = { email: [], password: [] };

		const email = formData.get('email');
		const password = formData.get('password');

		if (!isEmail(email)) {
			errors.email.push('Invalid email address.');
		}

		if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
			errors.password.push(
				'You must provide a password with at least six characters.'
			);
		}

		if (errors.email.length > 0 || errors.password.length > 0) {
			return { errors, enteredValues: { email, password } };
		}
		dispatch(sendAuthData(email, password));
		return { errors: null };
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

				<button type="submit">LOGIN</button>
			</form>
			<p>
				Don't have an account? <span className={classes.link}>Join us!</span>
			</p>
		</div>
	);
}
