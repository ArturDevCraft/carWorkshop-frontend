import { useActionState } from 'react';
import { useDispatch } from 'react-redux';

export default function NewCar() {
	const [state, formAction] = useActionState(actionHandler);
	const dispatch = useDispatch();
	const actionHandler = (prevState, formData) => {
        let errors = {
                    make: null,
                    model: null,
                    vin: null,
                };
        
                const carData = {
                    make: formData.get('make'),
                    model: formData.get('model'),
                    vin: formData.get('vin'),
                };

        
                if (!isNotEmpty(carData.make)) {
                    errors.make ='You must provide make';
                }
                if (!isNotEmpty(carData.model)) {
                    errors.model ='You must provide model';
                }
                if (!isNotEmpty(carData.vin)) {
                    errors.vin ='You must provide vin';
                }

        
                if (
                    errors.make !== null ||
                    errors.model !== null ||
                    errors.vin !== null
                ) {
                    return { errors, enteredValues: carData };
                }
        
                try {
                    await dispatch(sendNewCarData(carData));
                    dispatch(
                        uiActions.showNotification({
                            title: 'Car added!',
                            msg: 'You can add new repair',
                        })
                    );
                    return { errors: null };
                } catch (err) {
                    const errMsg = await err.json();
        
                    return { errors: errMsg.errors, enteredValues: userData };
                }
    };

	return (
		<>
			<h2>Add new car</h2>
			<form action={formAction}>
                
            </form>
		</>
	);
}
