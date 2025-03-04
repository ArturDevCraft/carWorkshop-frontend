import { createSlice } from '@reduxjs/toolkit';
import { getAuthToken, setAuthToken } from '../util/auth';
const initialState = {
	token: getAuthToken();
}
const authSlice = createSlice({
	name: 'auth',
	initialState: { token: null },
	reducers: {
		login(loginData) {
			const response = await fetch('http://localhost:5050/login',{
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(loginData)
			});

			if (response.status === 422 || response.status === 401) {
				return response;
			}
		
			if (!response.ok) {
				throw json({ message: 'Could not authenticate user.' }, { status: 500 });
			}

			const resData = await response.json();
			const token = resData.token;
			setAuthToken(token);
		},
		logout() {},
	},
});

export const authActions = authSlice.actions;

export default authSlice;
