import { useSelector } from 'react-redux';
import LogoutButton from '../LogoutButton';
import classes from './CustomerLayout.module.scss';
import Menu from './Menu';
import MenuItem from './MenuItem';

export default function CustomerLayout() {
	const view = useSelector((state) => state.ui.selectedView);
	return (
		<div>
			<aside>
				<Menu>
					<MenuItem view="myCars">My Cars</MenuItem>
					<MenuItem view="myRepairs">My Repairs</MenuItem>
					<MenuItem view="myAccount">Account</MenuItem>
					<LogoutButton />
				</Menu>
			</aside>
			<main>
				<header></header>
				<section>
					{view === 'myCars' && <p>Cars</p>}
					<h2>hello customer</h2>
				</section>
			</main>
		</div>
	);
}
