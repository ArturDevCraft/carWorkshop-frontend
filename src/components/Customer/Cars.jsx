import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCarsData } from '../../store/cars-actions';
import classes from './Cars.module.scss';
import NewCar from './NewCar';

export default function Cars() {
	const dispatch = useDispatch();
	const cars = useSelector((state) => state.cars.carsData);
	useEffect(() => {
		dispatch(getCarsData());
	}, []);

	const deleteHandler = (id) => {};
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
							<button
								className={classes.actionBtn}
								onClick={() => deleteHandler(car._id)}
							>
								Delete
							</button>
							<button
								className={classes.actionBtn}
								onClick={() => editHandler(car._id)}
							>
								Edit
							</button>
						</div>
					</div>
				))}
				<NewCar />
			</div>
		</>
	);
}
