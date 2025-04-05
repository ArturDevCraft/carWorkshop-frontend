import { getAuthToken, removeAuthTokenLocally } from '../util/auth';
const API_URL = import.meta.env.VITE_API_URL;

export async function sendRequest({
	method,
	endPoint,
	data = null,
	auth = null,
}) {
	const token = getAuthToken();
	try {
		const response = await fetch(API_URL + '/' + endPoint, {
			method,
			headers: {
				'Content-Type': 'application/json',
				...(auth && { Authorization: 'Bearer ' + token }),
			},
			...(data && { body: JSON.stringify(data) }),
		});

		if (!response.ok) {
			const error = new Error(
				`An error occured while sending to: 
					${API_URL}/${endPoint} 
					error code:  
					${response.status}`
			);

			error.code = response.status;
			const data = await response.json();
			error.errors = data.errors;
			throw error;
		}

		const resData = await response.json();
		return resData;
	} catch (error) {
		if (auth && error.code === 401) {
			removeAuthTokenLocally();
		}
		throw error;
	}
}
