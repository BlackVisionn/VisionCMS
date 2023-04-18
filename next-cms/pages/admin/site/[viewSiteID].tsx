import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { UserAPI } from '@/api/user.api';

const SiteView = () => {
	const router = useRouter();
	const siteID = router.query.viewSiteID;

	const [auth, setAuth] = useState(false);

	useEffect(() => {
		(async () => {
			const user = await UserAPI.getUser();

			if (user.name == undefined) {
				setAuth(false);
				await router.push('/login');
			} else {
				setAuth(true);
			}
		})();
	});
	return (
		<div>
			<h1>Site: {siteID}</h1>
		</div>
	);
};

export default SiteView;
