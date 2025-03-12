import './App.scss';
import Login from './components/Login';
import { useDispatch, useSelector } from 'react-redux';
import LogoutButton from './components/LogoutButton';
import { useEffect } from 'react';
import { getLoggedUserData } from './store/auth-actions';
import Signup from './components/Signup';
import Notification from './components/Notification';

function App() {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);
	const userEmail = useSelector((state) => state.auth.email);
	const userRole = useSelector((state) => state.auth.role);
	const isSignupVisible = useSelector((state) => state.ui.isSignupVisible);

	useEffect(() => {
		if (token) {
			dispatch(getLoggedUserData());
		}
	}, [token]);
	return (
		<>
			<Notification title="Everything ok">Done</Notification>
			{!token && !isSignupVisible && <Login />}
			{!token && isSignupVisible && <Signup />}
			{token && (
				<p>
					Hello: {userEmail}, Your role is: {userRole}
				</p>
			)}
			{token && <LogoutButton />}
		</>
	);
}

export default App;
