import { authActions } from './auth-slice';
import { removeAuthTokenLocally, saveAuthTokenLocally } from '../util/auth';
import { uiActions } from './ui-slice';

export const sendAuthData = (email, password) => {
	return async (dispatch) => {
		let errors = [];

		if (errors.length > 0) {
			return { errors };
		} else {
			const getToken = async () => {
				const response = await fetch('http://localhost:5050/login', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email, password }),
				});

				if (response.status === 422 || response.status === 401) {
					// saveAuthTokenLocally(null);
					// return response;
					throw new Error('Could not authenticate!');
				}

				if (!response.ok) {
					throw new Error('Could not authenticate!');
				}

				const resData = await response.json();
				return resData.token;
			};

			try {
				const token = await getToken();
				saveAuthTokenLocally(token);
				dispatch(authActions.setToken(token));
			} catch (error) {
				throw error;
			}
		}
	};
};

export const sendSignupData = (userData) => {
	return async (dispatch) => {
		let errors = [];

		if (errors.length > 0) {
			return { errors };
		} else {
			const registerNewUser = async () => {
				const response = await fetch('http://localhost:5050/signup', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(userData),
				});

				if (
					response.status === 422 ||
					response.status === 401 ||
					!response.ok
				) {
					// throw new Error('Could not add new user!');
					throw response;
				}
				const resData = await response.json();
				return resData;
			};

			try {
				await registerNewUser();
				dispatch(uiActions.toggleLogin());
			} catch (error) {
				throw error;
			}
		}
	};
};

export const logout = () => {
	return (dispatch) => {
		removeAuthTokenLocally();
		dispatch(authActions.setToken(false));
	};
};
