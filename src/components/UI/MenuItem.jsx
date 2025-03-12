import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

export default function MenuItem({ children, view }) {
	const dispatch = useDispatch();
	const clickHandler = () => {
		dispatch(uiActions.setSelectedView(view));
	};
	return (
		<li>
			<button onClick={clickHandler}>{children}</button>
		</li>
	);
}
