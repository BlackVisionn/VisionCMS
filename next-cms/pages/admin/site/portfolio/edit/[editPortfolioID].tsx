import Layout from '@/components/Layout';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserAPI } from '@/api/user.api';
import { PortfolioAPI } from '@/api/portfolio.api';

const PortfolioEdit = () => {
	const [components, setComponents] = useState<any>([]);
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
			const resp = await PortfolioAPI.getComponentsForPortfolioByPortfolioId(
				siteID,
			);
			setComponents(resp);
		})();
	});

	return (
		<Layout auth={auth}>
			Portfolio Site with id: {siteID} EditPage
			<br />
			id: {components.id}
			<br />
			Header: {components.useHeader ? 'TRUE' : 'FALSE'}
			<br />
			About: {components.useAbout ? 'TRUE' : 'FALSE'}
			<br />
			Projects: {components.useProject ? 'TRUE' : 'FALSE'}
			<br />
			Work: {components.useWork ? 'TRUE' : 'FALSE'}
			<br />
			Education: {components.useEducation ? 'TRUE' : 'FALSE'}
			<br />
			Languages: {components.useLanguages ? 'TRUE' : 'FALSE'}
			<br />
			Contact: {components.useContact ? 'TRUE' : 'FALSE'}
			<br />
			Footer: {components.useFooter ? 'TRUE' : 'FALSE'}
			<br />
			PortfID: {components.portfolioId}
			<br />
		</Layout>
	);
};

export default PortfolioEdit;
