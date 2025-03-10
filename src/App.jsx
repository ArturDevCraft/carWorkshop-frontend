import './App.scss';
import Login from './components/Login';
import { useSelector } from 'react-redux';
import LogoutButton from './components/LogoutButton';

function App() {
	const token = useSelector((state) => state.auth.token);

	return (
		<>
			{!token && <Login />}
			{token && <p>You are logged in!</p>}
			{token && <LogoutButton />}
		</>
	);
}

export default App;
