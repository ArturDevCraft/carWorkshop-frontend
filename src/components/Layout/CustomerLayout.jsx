import { useSelector } from 'react-redux';
import LogoutButton from '../UI/LogoutButton';
import classes from './CustomerLayout.module.scss';
import Menu from './Menu';
import MenuItem from '../UI/MenuItem';
import Cars from '../Customer/Cars';
import Header from './Header';
import LoggedUserInfo from './LoggedUserInfo';

export default function CustomerLayout() {
	const view = useSelector((state) => state.ui.selectedView);

	return (
		<>
			<div className={classes.content}>
				<Header darkblue></Header>
				<Header>
					<LoggedUserInfo />
				</Header>
				<aside>
					<Menu>
						<MenuItem view="myCars" text="My cars">
							<i className="fa-solid fa-car"></i>
						</MenuItem>
						<MenuItem view="myRepairs" text="My Repairs">
							<i className="fa-solid fa-screwdriver-wrench"></i>
						</MenuItem>
						<MenuItem view="myAccount" text="Account">
							<i className="fa-regular fa-user"></i>
						</MenuItem>
						<LogoutButton />
					</Menu>
				</aside>
				<main>
					<section>
						{view === 'myCars' && (
							<>
								<Cars />
							</>
						)}
					</section>
				</main>
			</div>
		</>
	);
}
