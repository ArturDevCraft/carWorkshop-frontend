import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	carsData: [],
};
const carsSlice = createSlice({
	name: 'cars',
	initialState,
	reducers: {
		setCarData(state, action) {
			state.carsData = action.payload;
		},
	},
});

export default carsSlice;
export const carsActions = carsSlice.actions;
