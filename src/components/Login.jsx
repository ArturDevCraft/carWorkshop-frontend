import { Link } from 'react';
import classes from './Login.module.scss';
import { useActionState } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth-slice';
import { setAuthToken } from '../util/auth';

async function loginHandler(prevFormState, formData) {
	const email = formData.get('email');
	const password = formData.get('password');

	let errors = [];

	if (errors.length > 0) {
		return { errors };
	} else {
		const response = await fetch('http://localhost:5050/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});

		if (response.status === 422 || response.status === 401) {
			setAuthToken(null);
			return response;
		}

		if (!response.ok) {
			throw json({ message: 'Could not authenticate user.' }, { status: 500 });
		}
		const resData = await response.json();
		const token = resData.token;
		setAuthToken(token);
		return { token: token };
	}
}

export default function Login() {
	const [formState, formAction, isPending] = useActionState(loginHandler);
	const dispatch = useDispatch();

	if (formState?.token) {
		dispatch(authActions.setToken(formState.token));
	}

	return (
		<div className={classes.login}>
			<h2>Login to Car Repair Booking</h2>
			<form action={formAction}>
				<input id="email" name="email" type="email" placeholder="E-mail" />
				<input
					id="password"
					name="password"
					type="password"
					placeholder="Password"
				/>

				<button type="submit">LOGIN</button>
			</form>
			<p>
				Don't have an account? <span className={classes.link}>Join us!</span>
			</p>
		</div>
	);
}
