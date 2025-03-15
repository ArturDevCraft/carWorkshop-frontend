import calsses from './Menu.module.scss';
export default function Menu({ children }) {
	return (
		<nav className={calsses.menu}>
			<ul>{children}</ul>
		</nav>
	);
}
