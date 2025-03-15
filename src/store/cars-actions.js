import { getAuthToken } from '../util/auth';
import { carsActions } from './cars-slice';
import { uiActions } from './ui-slice';

export const sendCarData = async (carData) => {
	let errors = [];

	if (errors.length > 0) {
		return { errors };
	} else {
		const addNewCar = async () => {
			const token = getAuthToken();
			const response = await fetch('http://localhost:5050/addcar', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
				body: JSON.stringify(carData),
			});

			if (response.status === 422 || response.status === 401 || !response.ok) {
				// throw new Error('Could not add new user!');
				throw response;
			}

			const resData = await response.json();
			return resData;
		};

		try {
			await addNewCar();
		} catch (error) {
			throw error;
		}
	}
};

export const getCarsData = () => {
	return async (dispatch) => {
		const getCarsData = async () => {
			const token = getAuthToken();
			const response = await fetch('http://localhost:5050/getCars', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			});

			if (response.status === 422 || response.status === 401) {
				dispatch(logout());
				// throw new Error('Could not got logged user data!');
				throw response;
			}

			if (!response.ok) {
				throw new Error('Could not got cars data!');
			}

			const resData = await response.json();
			return resData.data;
		};

		try {
			const data = await getCarsData();
			dispatch(carsActions.setCarData(data));
		} catch (error) {}
	};
};

export const deleteCar = async (id) => {
	const deleteCar = async (id) => {
		const token = getAuthToken();
		const response = await fetch('http://localhost:5050/deleteCar/' + id, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		});

		if (response.status === 422 || response.status === 401) {
			// throw new Error('Could not got logged user data!');
			throw response;
		}

		if (!response.ok) {
			throw new Error('Could not delete car!');
		}

		const resData = await response.json();
		return resData.data;
	};

	try {
		const data = await deleteCar(id);
	} catch (error) {}
};
