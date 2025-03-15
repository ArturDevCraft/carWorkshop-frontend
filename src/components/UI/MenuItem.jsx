import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import classes from './MenuItem.module.scss';

export default function MenuItem({ children, view, text }) {
	const activeView = useSelector((state) => state.ui.selectedView);

	const dispatch = useDispatch();
	const clickHandler = () => {
		dispatch(uiActions.setSelectedView(view));
	};
	return (
		<li className={`${classes.item} ${view === activeView && classes.active}`}>
			<a onClick={clickHandler}>
				<p className={classes.icon}>{children}</p>
				<p className={classes.text}>{text}</p>
			</a>
		</li>
	);
}
