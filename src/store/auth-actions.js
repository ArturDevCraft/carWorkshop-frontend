import { authActions } from './auth-slice';
import {
	getAuthToken,
	removeAuthTokenLocally,
	saveAuthTokenLocally,
} from '../util/auth';
import { sendRequest } from '../util/http';
import {
	isEmail,
	isNotEmpty,
	hasMinLength,
	isEqualToOtherValue,
} from '../util/validation.js';

const API_URL = import.meta.env.VITE_API_URL;

export const sendAuthData = (email, password) => {
	return async (dispatch) => {
		let errors = { email: null, password: null };

		if (!isEmail(email)) {
			errors.email = 'Invalid email address.';
		}

		if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
			errors.password =
				'You must provide a password with at least six characters.';
		}

		if (errors.email !== null || errors.password !== null) {
			const error = new Error('Validation error.');
			error.errors = errors;
			throw error;
		} else {
			try {
				const token = await sendRequest({
					method: 'POST',
					endPoint: 'login',
					data: { email, password },
				});

				saveAuthTokenLocally(token.token);
				dispatch(authActions.setToken(token.token));
			} catch (error) {
				throw error;
			}
		}
	};
};

export const sendSignupData = async (userData) => {
	let errors = {
		email: null,
		password: null,
		passwordConfirm: null,
		name: null,
		role: null,
	};

	if (!isEmail(userData.email)) {
		errors.email = 'Invalid email address.';
	}

	if (!isNotEmpty(userData.password) || !hasMinLength(userData.password, 6)) {
		errors.password =
			'You must provide a password with at least six characters.';
	}
	if (!isNotEmpty(userData.name) || !hasMinLength(userData.name, 2)) {
		errors.name = 'You must provide a name.';
	}

	if (!isEqualToOtherValue(userData.password, userData.passwordConfirm)) {
		errors.passwordConfirm = 'Passwords must be the same.';
	}
	if (
		errors.email !== null ||
		errors.password !== null ||
		errors.passwordConfirm !== null ||
		errors.name !== null ||
		errors.role !== null
	) {
		const error = new Error('Validation error.');
		error.errors = errors;
		throw error;
	} else {
		try {
			await sendRequest({
				method: 'POST',
				endPoint: 'signup',
				data: userData,
			});
		} catch (error) {
			throw error;
		}
	}
};

export const logout = () => {
	return (dispatch) => {
		removeAuthTokenLocally();
		dispatch(authActions.setToken(false));
	};
};

export const getToken = () => {
	return (dispatch) => {
		const token = getAuthToken();
		dispatch(authActions.setToken(token));
	};
};
