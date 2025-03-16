import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import uiSlice from './ui-slice';
import carsSlice from './cars-slice';
import userSlice from './user-slice';

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		ui: uiSlice.reducer,
		cars: carsSlice.reducer,
		user: userSlice.reducer
	},
});

export default store;
