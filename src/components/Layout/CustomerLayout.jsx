import { useSelector } from 'react-redux';
import LogoutButton from '../UI/LogoutButton';
import classes from './CustomerLayout.module.scss';
import Menu from './Menu';
import MenuItem from '../UI/MenuItem';
import NewCar from '../Customer/NewCar';
import Cars from '../Customer/Cars';

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
					{view === 'myCars' && (
						<>
							<NewCar />
							<Cars />
						</>
					)}

					<h2>hello customer</h2>
				</section>
			</main>
		</div>
	);
}
