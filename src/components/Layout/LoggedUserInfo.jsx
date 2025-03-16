import { useSelector } from 'react-redux';
import classes from './LoggedUserInfo.module.scss';

export default function LoggedUserInfo() {
	const user = {
		email: useSelector((state) => state.user.email),
		role: useSelector((state) => state.user.role),
		name: useSelector((state) => state.user.name),
	};

	return (
		<div className={classes.container}>
			<span className={classes.icon}>
				<i className="fa-solid fa-circle-user"></i>
			</span>
			<span className={classes.name}>{user.name}</span>
			<span className={classes.email}>({user.email})</span>
			<span className={classes.separator}></span>
			<span className={classes.role}>
				{user.role === 'customer' ? ' Customer' : ''}
				{user.role === 'workshop' ? ' Workshop administrator' : ''}
			</span>
		</div>
	);
}
