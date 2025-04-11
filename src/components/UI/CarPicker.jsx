import { useEffect, useMemo, useState } from 'react';
import classes from './CarPicker.module.scss';
import Select from './Select';
import { useDispatch, useSelector } from 'react-redux';
import { getCarsData } from '../../store/cars-actions';

export default function CarPicker({ name, defaultValue, placeHolder, errors }) {
	const dispatch = useDispatch();

	const carsData = useSelector((state) => state.cars.carsData);

	const cars = useMemo(
		() => [
			{ text: placeHolder, value: 0 },
			...carsData.map((item) => ({
				text: `${item.make} ${item.model}`,
				value: item._id,
			})),
		],
		[carsData]
	);

	useEffect(() => {
		dispatch(getCarsData());
	}, []);

	return (
		<>
			<Select
				options={cars}
				name={name}
				defaultValue={defaultValue}
				errors={errors}
			/>
		</>
	);
}
