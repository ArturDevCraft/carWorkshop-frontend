import { sendRequest } from '../util/http';
import { logout } from './auth-actions';
import { uiActions } from './ui-slice';
import { userActions } from './user-slice';

const API_URL = import.meta.env.VITE_API_URL;

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
