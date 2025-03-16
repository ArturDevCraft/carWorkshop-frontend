import { useSelector } from 'react-redux';

export default function LoggedUserInfo() {
	const user = {
		email: useSelector((state) => state.auth.email),
		role: useSelector((state) => state.auth.role),
	};

	return <>
    <p>
        <span></span>
    </p>
    </>;
}
