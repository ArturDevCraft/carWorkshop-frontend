import { sendRequest } from '../util/http';
import { carsActions } from './cars-slice';
import { hasMinLength, isNotEmpty } from '../util/validation';
import { getToken } from './auth-actions';

export const sendCarData = async (carData) => {
	let errors = {
		make: null,
		model: null,
		vin: null,
	};
	if (!isNotEmpty(carData.make)) {
		errors.make = 'You must provide make';
	}
	if (!isNotEmpty(carData.model)) {
		errors.model = 'You must provide model';
	}
	if (!hasMinLength(carData.vin, 17)) {
		errors.vin = 'Vin must have 17 characters';
	}

	if (errors.make !== null || errors.model !== null || errors.vin !== null) {
		const error = new Error('Validation error.');
		error.errors = errors;
		throw error;
	} else {
		try {
			await sendRequest({
				method: 'POST',
				endPoint: 'addcar',
				data: carData,
				auth: true,
			});
		} catch (error) {
			throw error;
		}
	}
};

export const updateCarData = async (carData, carId) => {
	let errors = {
		make: null,
		model: null,
		vin: null,
	};

	if (!isNotEmpty(carData.make)) {
		errors.make = 'You must provide make';
	}
	if (!isNotEmpty(carData.model)) {
		errors.model = 'You must provide model';
	}
	if (!hasMinLength(carData.vin, 17)) {
		errors.vin = 'Vin must have 17 characters';
	}

	if (errors.make !== null || errors.model !== null || errors.vin !== null) {
		const error = new Error('Validation error.');
		error.errors = errors;
		throw error;
	} else {
		try {
			await sendRequest({
				method: 'PUT',
				endPoint: 'updatecar/' + carId,
				data: carData,
				auth: true,
			});
		} catch (error) {
			throw error;
		}
	}
};

export const getCarsData = () => {
	return async (dispatch) => {
		try {
			const data = await sendRequest({
				method: 'GET',
				endPoint: 'getCars',
				auth: true,
			});
			dispatch(carsActions.setCarData(data.data));
		} catch (error) {
			dispatch(getToken());
			throw error;
		}
	};
};

export const deleteCar = async (id) => {
	try {
		const data = await sendRequest({
			method: 'DELETE',
			endPoint: 'deleteCar/' + id,
			auth: true,
		});
	} catch (error) {
		throw error;
	}
};
