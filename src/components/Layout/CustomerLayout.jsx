import LogoutButton from '../LogoutButton';
import classes from './CustomerLayout.module.scss';

export default function CustomerLayout() {
	return (
		<div>
			<aside>
				<LogoutButton />
			</aside>
			<main>
				<header></header>
				<section>
					<h2>hello customer</h2>
				</section>
			</main>
		</div>
	);
}
