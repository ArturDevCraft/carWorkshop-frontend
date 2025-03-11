import classes from './Signup.module.scss';
import { useActionState } from 'react';
import { useDispatch } from 'react-redux';
import { sendSignupData } from '../store/auth-actions';
import {
	isEmail,
	isNotEmpty,
	hasMinLength,
	isEqualToOtherValue,
} from '../util/validation.js';
import Input from './Input.jsx';
import SignupToggleButton from './SignupToggleButton.jsx';

export default function Signup() {
	const [formState, formAction, isPending] = useActionState(signupAction, {
		errors: null,
	});
	const dispatch = useDispatch();

	async function signupAction(prevFormState, formData) {
		let errors = { email: [], password: [], passwordConfirm: [], name: [] };

		const userData = {
			email: formData.get('email'),
			password: formData.get('password'),
			passwordConfirm: formData.get('passwordConfirm'),
			name: formData.get('name'),
		};

		if (!isEmail(userData.email)) {
			errors.email.push('Invalid email address.');
		}

		if (!isNotEmpty(userData.password) || !hasMinLength(userData.password, 6)) {
			errors.password.push(
				'You must provide a password with at least six characters.'
			);
		}
		if (!isNotEmpty(userData.name) || !hasMinLength(userData.name, 2)) {
			errors.name.push('You must provide a name.');
		}

		if (!isEqualToOtherValue(userData.password, userData.passwordConfirm)) {
			errors.passwordConfirm.push('Passwords must be the same.');
		}

		if (errors.email.length > 0 || errors.password.length > 0) {
			return { errors, enteredValues: userData };
		}

		try {
			await dispatch(sendSignupData(userData));
			return { errors: null };
		} catch (err) {
			errors.password.push('Invalid email or password.');
			errors.email.push('Invalid email or password.');
			return { errors, enteredValues: userData };
		}
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

				<select name="role" id="role">
					<option value="customer">Customer</option>
					<option value="workshop">Workshop administrator</option>
				</select>

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
