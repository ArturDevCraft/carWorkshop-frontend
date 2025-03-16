import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCarsData } from '../../store/cars-actions';
import classes from './Cars.module.scss';
import NewCar from './NewCar';
import DeleteCarButton from './DeleteCarButton';
import EditCar from './EditCar';

export default function Cars() {
	const dispatch = useDispatch();
	const cars = useSelector((state) => state.cars.carsData);
	useEffect(() => {
		dispatch(getCarsData());
	}, []);

	const editHandler = (id) => {};
	return (
		<>
			<h2>Your Cars</h2>
			<div className={classes.container}>
				{cars.map((car) => (
					<div className={classes.card} key={car._id}>
						<div className={classes.front}>
							<p className={classes.make}>
								{car.make} {car.model}
							</p>
							<p className={classes.vin}>VIN: {car.vin}</p>
						</div>
						<div className={classes.back}>
							<DeleteCarButton carId={car._id} />
							<EditCar carData={car} carId={car._id} />
						</div>
					</div>
				))}
				<NewCar />
			</div>
		</>
	);
}
