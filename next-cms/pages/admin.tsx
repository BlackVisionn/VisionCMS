import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserAPI } from '@/api/user.api';

const Admin = () => {
	const [message, setMessage] = useState('');

	const [auth, setAuth] = useState(false);
	const router = useRouter();

	useEffect(() => {
		(async () => {
			const resp = await UserAPI.getUser();

			if (resp.name == undefined) {
				setAuth(false);
				await router.push('/login');
			} else {
				setMessage(
					`Вы вошли как: ${resp.name}
					Эл. почта: ${resp.email} + ${resp.id}`,
				);
				setAuth(true);
			}
		})();
	});

	return (
		<Layout auth={auth}>
			<h1>{message}</h1>
		</Layout>
	);
};

export default Admin;
