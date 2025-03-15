import { useDispatch } from 'react-redux';
import { logout } from '../../store/auth-actions';
import classes from './MenuItem.module.scss';

export default function LogoutButton() {
	const dispatch = useDispatch();
	function logoutHandler() {
		dispatch(logout());
	}

	return (
		<li className={classes.item}>
			<a onClick={logoutHandler}>
				<p className={classes.icon}>
					<i className="fa-solid fa-arrow-right-from-bracket"></i>
				</p>
				<p className={classes.text}>Logout</p>
			</a>
		</li>
	);
}
