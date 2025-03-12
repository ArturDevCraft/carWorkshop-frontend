import { useEffect, useState } from 'react';
import InputErrorList from './InputErrorList';
import classes from './Select.module.scss';

export default function Select({ name, options, defaultValue, errors }) {
	const [selected, setSelected] = useState('customer');

	useEffect(() => {
		setSelected(defaultValue);
	}, [errors]);

	return (
		<>
			<select
				key={selected}
				name={name}
				id={name}
				defaultValue={selected}
				onChange={(e) => setSelected(e.target.value)}
				className={errors && classes.error}
			>
				{options.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.text}
					</option>
				))}
			</select>
			{errors && <InputErrorList errors={errors} />}
		</>
	);
}
