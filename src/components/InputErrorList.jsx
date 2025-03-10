import classes from './InputErrorList.module.scss';
export default function InputErrorList({ errors }) {
	return (
		<ul className={classes.errBox}>
			{errors.map((error) => (
				<li key={error}>{error}</li>
			))}
		</ul>
	);
}
