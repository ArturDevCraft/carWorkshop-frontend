import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import classes from './SignupToggleButton.module.scss';

export default function SignupToggleButton({ children }) {
	const dispatch = useDispatch();
	const handleToggle = () => {
		dispatch(uiActions.toggleLogin());
	};
	return (
		<button className={classes.link} onClick={handleToggle}>
			{children}
		</button>
	);
}
