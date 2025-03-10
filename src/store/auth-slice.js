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
		setUserCredentials(state, action) {
			state.role = action.payload.role;
			state.email = action.payload.email;
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice;
