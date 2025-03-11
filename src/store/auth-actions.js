import { authActions } from './auth-slice';
import {
	getAuthToken,
	removeAuthTokenLocally,
	saveAuthTokenLocally,
} from '../util/auth';

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

export const getLoggedUserData = () => {
	return async (dispatch) => {
		const getUserData = async () => {
			const token = getAuthToken();
			const response = await fetch('http://localhost:5050/user', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			});

			if (response.status === 422 || response.status === 401) {
				// saveAuthTokenLocally(null);
				return response;
			}

			if (!response.ok) {
				throw new Error('Could not got logged user data!');
			}

			const resData = await response.json();
			return resData.loggedUserData;
		};

		try {
			const data = await getUserData();
			dispatch(
				authActions.setUserCredentials({ role: data.role, email: data.email })
			);
		} catch (error) {}
	};
};

export const logout = () => {
	return (dispatch) => {
		removeAuthTokenLocally();
		dispatch(authActions.setToken(false));
	};
};
