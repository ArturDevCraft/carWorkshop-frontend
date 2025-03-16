import './App.scss';
import Login from './components/Layout/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Signup from './components/Layout/Signup';
import Notification from './components/UI/Notification';
import CustomerLayout from './components/Layout/CustomerLayout';
import { getLoggedUserData } from './store/user-actions';

function App() {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);
	const userRole = useSelector((state) => state.user.role);
	const isSignupVisible = useSelector((state) => state.ui.isSignupVisible);
	const isNotificationVisible = useSelector(
		(state) => state.ui.isNotificationVisible
	);

	useEffect(() => {
		if (token) {
			dispatch(getLoggedUserData());
		}
	}, [token]);
	return (
		<>
			{isNotificationVisible && <Notification />}
			{!token && !isSignupVisible && <Login />}
			{!token && isSignupVisible && <Signup />}
			{token && userRole === 'customer' && <CustomerLayout />}
		</>
	);
}

export default App;
