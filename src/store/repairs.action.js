import { sendRequest } from '../util/http';
import { hasMinLength, isNotEmpty } from '../util/validation';
import { repairsActions } from './repairs-slice';

export const sendRepairData = (repairData) => {
	return async (dispatch) => {
		let errors = {
			description: null,
			carId: null,
		};

		if (!isNotEmpty(repairData.description)) {
			errors.description = 'You must provide description ';
		}

		if (repairData.carId == 0) {
			errors.carId = 'Please select car model';
		}

		if (errors.description !== null || errors.carId !== null) {
			const error = new Error('Validation error.');
			error.errors = errors;
			throw error;
		} else {
			try {
				await sendRequest({
					method: 'POST',
					endPoint: 'addrepair',
					data: repairData,
					auth: true,
				});
			} catch (error) {
				throw error;
			}
		}
	};
};
