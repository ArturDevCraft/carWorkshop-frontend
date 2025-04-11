import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	repairsData: [],
};
const repairsSlice = createSlice({
	name: 'repairs',
	initialState,
	reducers: {
		setRepairsData(state, action) {
			state.repairsData = action.payload;
		},
	},
});

export default repairsSlice;
export const repairsActions = repairsSlice.actions;
