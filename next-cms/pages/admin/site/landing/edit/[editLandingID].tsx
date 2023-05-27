import Layout from '@/components/Layout';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserAPI } from '@/api/user.api';
import { LandingAPI } from '@/api/landing.api';

const LandingEdit = () => {
	const [components, setComponents] = useState<any>([]);
	const [auth, setAuth] = useState(false);
	const router = useRouter();
	const siteID = Number(router.query.editLandingID);
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
			const resp = await LandingAPI.getComponentsForLandingByLandingId(siteID);
			setComponents(resp);
		})();
	});

	return (
		<Layout auth={auth}>
			Landing Site with id: {siteID} EditPage
			<br />
			id: {components.id}
			<br />
			Header: {components.useHeader ? 'TRUE' : 'FALSE'}
			<br />
			Features : {components.useFeatures ? 'TRUE' : 'FALSE'}
			<br />
			About: {components.useAbout ? 'TRUE' : 'FALSE'}
			<br />
			Services: {components.useServices ? 'TRUE' : 'FALSE'}
			<br />
			Portfolio: {components.usePortfolio ? 'TRUE' : 'FALSE'}
			<br />
			Team: {components.useTeam ? 'TRUE' : 'FALSE'}
			<br />
			Contact: {components.useContact ? 'TRUE' : 'FALSE'}
			<br />
			Footer: {components.useFooter ? 'TRUE' : 'FALSE'}
			<br />
			LandID: {components.landingId}
			<br />
		</Layout>
	);
};

export default LandingEdit;
