import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const NewSite = () => {
	const [auth, setAuth] = useState(false);
	const router = useRouter();
	useEffect(() => {
		(async () => {
			const response = await fetch('http://localhost:5000/auth/user', {
				credentials: 'include',
			});

			const content = await response.json();
			if (content.name == undefined) {
				setAuth(false);
				await router.push('/login');
			} else {
				setAuth(true);
			}
		})();
	});
	return (
		<Layout auth={auth}>
			<h1>NewSite</h1>
		</Layout>
	);
};

export default NewSite;
