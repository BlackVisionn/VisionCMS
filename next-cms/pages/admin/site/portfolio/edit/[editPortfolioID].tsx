import Layout from '@/components/Layout';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserAPI } from '@/api/user.api';

const PortfolioEdit = () => {
	const [site, setSite] = useState<any>([]);
	const [auth, setAuth] = useState(false);
	const router = useRouter();
	const siteID = Number(router.query.editPortfolioID);
	const [userId, setUserId] = useState(0);

	useEffect(() => {
		(async () => {
			const user = await UserAPI.getUser();

			if (user.name == undefined) {
				setAuth(false);
				await router.push('/login');
			} else {
				setAuth(true);
				setUserId(user.id);
			}
		})();
	});

	return <Layout auth={auth}>Portfolio Site with id: {siteID} EditPage</Layout>;
};

export default PortfolioEdit;
