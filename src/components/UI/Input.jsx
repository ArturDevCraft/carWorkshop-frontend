import classes from './Input.module.scss';
import InputErrorList from './InputErrorList';

export default function Input({
	name,
	placeholder,
	type,
	defaultValue,
	errors,
}) {
	return (
		<>
			<input
				id={name}
				name={name}
				type={type}
				placeholder={placeholder}
				defaultValue={defaultValue}
				className={errors?.length > 0 ? classes.error : ''}
			/>
			{errors && <InputErrorList errors={errors} />}
		</>
	);
}
