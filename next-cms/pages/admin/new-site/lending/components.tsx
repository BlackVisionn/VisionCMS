import { UserAPI } from '@/api/user.api';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const LendingComponents = () => {
	const [auth, setAuth] = useState(false);
	const [userId, setUserId] = useState(0);
	const router = useRouter();

	useEffect(() => {
		(async () => {
			const resp = await UserAPI.getUser();

			if (resp.name == undefined) {
				setAuth(false);
				await router.push('/login');
			} else {
				setAuth(true);
				setUserId(resp.id);
			}
		})();
	});
	return <Layout auth={auth}>Lending Components</Layout>;
};

export default LendingComponents;
