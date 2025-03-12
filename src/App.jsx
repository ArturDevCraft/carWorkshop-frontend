import './App.scss';
import Login from './components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getLoggedUserData } from './store/auth-actions';
import Signup from './components/Signup';
import Notification from './components/Notification';
import CustomerLayout from './components/Layout/CustomerLayout';

function App() {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);
	const userEmail = useSelector((state) => state.auth.email);
	const userRole = useSelector((state) => state.auth.role);
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
