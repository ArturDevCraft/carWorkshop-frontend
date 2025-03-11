import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isSignupVisible: false,
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		toggleLogin(state) {
			state.isSignupVisible = !state.isSignupVisible;
		},
	},
});

export const uiActions = uiSlice.actions;
export default uiSlice;
