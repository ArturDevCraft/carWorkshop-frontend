import './App.scss';
import Login from './components/Login';
import { useDispatch, useSelector } from 'react-redux';
import LogoutButton from './components/LogoutButton';
import { useEffect } from 'react';
import { getLoggedUserData } from './store/auth-actions';

function App() {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);
	const userEmail = useSelector((state) => state.auth.email);
	const userRole = useSelector((state) => state.auth.role);

	useEffect(() => {
		if (token) {
			dispatch(getLoggedUserData());
		}
	}, [token]);
	return (
		<>
			{!token && <Login />}
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
