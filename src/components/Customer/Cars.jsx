import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCarsData } from '../../store/cars-actions';
export default function Cars() {
	const dispatch = useDispatch();
	const cars = useSelector((state) => state.cars.carsData);
	useEffect(() => {
		dispatch(getCarsData());
	}, []);
	return (
		<div>
			{cars.map((car) => (
				<div key={car._id}>
					<p>{car.make}</p>
					<p>{car.model}</p>
					<p>{car.vin}</p>
				</div>
			))}
		</div>
	);
}
