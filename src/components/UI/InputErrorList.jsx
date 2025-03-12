import classes from './InputErrorList.module.scss';
export default function InputErrorList({ errors }) {
	const err = errors.split('||');
	return (
		<ul className={classes.errBox}>
			{err.map((error) => (
				<li key={error}>{error}</li>
			))}
		</ul>
	);
}
