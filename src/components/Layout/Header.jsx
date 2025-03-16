import classes from './Header.module.scss';
export default function Header({ darkblue, children }) {
	return (
		<header className={`${classes.header} ${darkblue && classes.darkblue}`}>
			{children}
		</header>
	);
}
