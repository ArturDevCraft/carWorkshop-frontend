import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isSignupVisible: false,
	isNotificationVisible: false,
	notificationContent: { title: null, msg: null },
	selectedView: null,
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		toggleLogin(state) {
			state.isSignupVisible = !state.isSignupVisible;
		},
		showNotification(state, action) {
			state.isNotificationVisible = true;
			state.notificationContent = action.payload;
		},
		hideNotification(state) {
			state.isNotificationVisible = false;
			state.notificationContent.title = null;
			state.notificationContent.msg = null;
		},
		setSelectedView(state, action) {
			state.selectedView = action.payload;
		},
	},
});

export const uiActions = uiSlice.actions;
export default uiSlice;
