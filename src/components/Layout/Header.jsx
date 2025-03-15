import classes from './Header.module.scss';
export default function Header({ darkblue }) {
	return (
		<header
			className={`${classes.header} ${darkblue && classes.darkblue}`}
		></header>
	);
}
