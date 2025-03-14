import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import uiSlice from './ui-slice';
import carsSlice from './cars-slice';

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		ui: uiSlice.reducer,
		cars: carsSlice.reducer,
	},
});

export default store;
