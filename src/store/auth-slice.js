import { createSlice } from '@reduxjs/toolkit';
import { getAuthToken } from '../util/auth';

const initialState = {
	token: getAuthToken() || false,
	role: null,
	email: null,
};
const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		setToken(state, action) {
			state.token = action.payload;
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice;
