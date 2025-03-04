import { Link } from 'react';
import classes from './Login.module.scss';

export default function Login() {
	return (
		<div className={classes.login}>
			<h2>Login to Car Repair Booking</h2>
			<form action="">
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
