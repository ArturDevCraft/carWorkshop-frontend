import classes from './Login.module.scss';
import { useActionState } from 'react';
import { useDispatch } from 'react-redux';
import { sendAuthData } from '../store/auth-actions';

export default function Login() {
	const [formState, formAction, isPending] = useActionState(loginHandler);
	const dispatch = useDispatch();

	function loginHandler(prevFormState, formData) {
		const email = formData.get('email');
		const password = formData.get('password');
		dispatch(sendAuthData(email, password));
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
