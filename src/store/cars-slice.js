import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	carData: null,
};
const carsSlice = createSlice({
	name: 'cars',
	initialState,
	reducers: {
		setCarData(state, action) {
			state.carData = action.payload;
		},
	},
});

export default carsSlice;
export const carsActions = carsSlice.actions;
