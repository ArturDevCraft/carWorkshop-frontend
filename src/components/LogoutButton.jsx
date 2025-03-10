import { useDispatch } from 'react-redux';
import { logout } from '../store/auth-actions';

export default function LogoutButton() {
	const dispatch = useDispatch();
	function logoutHandler() {
		dispatch(logout());
	}

	return <button onClick={logoutHandler}>Logout</button>;
}
