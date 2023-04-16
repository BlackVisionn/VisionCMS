import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserAPI } from '@/api/user.api';

const NewSite = () => {
	const [auth, setAuth] = useState(false);
	const router = useRouter();

	useEffect(() => {
		(async () => {
			const resp = await UserAPI.getUser();

			if (resp.name == undefined) {
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
