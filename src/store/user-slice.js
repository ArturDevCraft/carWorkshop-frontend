import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserCredentials(state, action) {
			state.role = action.payload.role;
			state.email = action.payload.email;
			state.name = action.payload.name;
		},
	},
});

export default userSlice;
export const userActions = userSlice.actions;
