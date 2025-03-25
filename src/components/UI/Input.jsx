import classes from './Input.module.scss';
import InputErrorList from './InputErrorList';

export default function Input({
	name,
	placeholder,
	type,
	defaultValue,
	errors,
	label,
}) {
	return (
		<div className={classes.wrapper}>
			{label && <label htmlFor={name}>{label}: </label>}
			<input
				id={name}
				name={name}
				type={type}
				placeholder={placeholder}
				defaultValue={defaultValue}
				className={errors?.length > 0 ? classes.error : ''}
			/>
			{errors && <InputErrorList errors={errors} />}
		</div>
	);
}
