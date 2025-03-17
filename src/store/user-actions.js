import { getAuthToken } from '../util/auth';
import { userActions } from './user-slice';

const API_URL = import.meta.env.VITE_API_URL;

export const getLoggedUserData = () => {
	return async (dispatch) => {
		const getUserData = async () => {
			const token = getAuthToken();
			const response = await fetch(API_URL + '/user', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			});

			if (response.status === 422 || response.status === 401) {
				dispatch(logout());
				// throw new Error('Could not got logged user data!');
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
				userActions.setUserCredentials({
					role: data.role,
					email: data.email,
					name: data.name,
				})
			);
		} catch (error) {}
	};
};
