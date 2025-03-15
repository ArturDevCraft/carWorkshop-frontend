import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCarsData } from '../../store/cars-actions';
import classes from './Cars.module.scss';

export default function Cars() {
	const dispatch = useDispatch();
	const cars = useSelector((state) => state.cars.carsData);
	useEffect(() => {
		dispatch(getCarsData());
	}, []);
	return (
		<>
			<h2>Your cars:</h2>
			<div className={classes.container}>
				{cars.map((car) => (
					<div className={classes.cart} key={car._id}>
						<p className={classes.make}>
							{car.make} {car.model}
						</p>
						<p className={classes.vin}>VIN: {car.vin}</p>
					</div>
				))}
			</div>
		</>
	);
}
