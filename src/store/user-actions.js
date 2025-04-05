import { sendRequest } from '../util/http';
import { isEmail, isEqualToOtherValue, isNotEmpty } from '../util/validation';
import { logout } from './auth-actions';
import { uiActions } from './ui-slice';
import { userActions } from './user-slice';

export const getLoggedUserData = () => {
	return async (dispatch) => {
		try {
			const data = await sendRequest({
				method: 'GET',
				endPoint: 'user',
				auth: true,
			});
			dispatch(
				userActions.setUserCredentials({
					role: data.loggedUserData.role,
					email: data.loggedUserData.email,
					name: data.loggedUserData.name,
				})
			);
		} catch (error) {
			let msg;
			if (error instanceof TypeError) {
				msg = 'Network error: Server is down or address is incorrect.';
			} else {
				msg = 'Fetch error:' + error.message;
			}

			if (error.code === 422 || error.code === 401) {
				dispatch(logout());
			}
			throw error;
		}
	};
};

export const updateUserData = async (userData) => {
	let errors = {
		name: null,
		email: null,
		oldPassword: null,
		newPassword: null,
		confirmPassword: null,
	};

	if (!isNotEmpty(userData.name)) {
		errors.name = 'You must provide name';
	}

	if (!isEmail(userData.email)) {
		errors.email = 'You must provide email';
	}

	if (
		isNotEmpty(userData.newPassword) &&
		!isEqualToOtherValue(userData.newPassword, userData.confirmPassword)
	) {
		!isNotEmpty(userData.oldPassword)
			? (errors.oldPassword = 'You must provide old password')
			: '';

		errors.newPassword = 'Passwords must be the same';
		errors.confirmPassword = 'Passwords must be the same';
	}

	if (
		errors.name !== null ||
		errors.email !== null ||
		errors.oldPassword !== null ||
		errors.newPassword !== null ||
		errors.confirmPassword !== null
	) {
		const error = new Error('Validation error.');
		error.errors = errors;
		throw error;
	} else {
		try {
			await sendRequest({
				method: 'PUT',
				endPoint: 'updateuser',
				data: userData,
				auth: true,
			});
		} catch (error) {
			throw error;
		}
	}
};
