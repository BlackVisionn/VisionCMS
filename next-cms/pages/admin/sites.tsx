import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserAPI } from '@/api/user.api';

import styles from '../../styles/Site.module.css';
import Landing from '@/components/Landing';
import { LandingDTO } from '@/api/dto/landing.dto';
import { LandingAPI } from '@/api/landing.api';
import { PortfolioDTO } from '@/api/dto/portfolio.dto';
import { PortfolioAPI } from '@/api/portfolio.api';
import Portfolio from '@/components/Portfolio';

const Sites = () => {
	const [auth, setAuth] = useState(false);
	const router = useRouter();
	const [userId, setUserId] = useState(0);
	const [landings, setLandings] = useState<LandingDTO[]>([]);
	const [portfolios, setPortfolios] = useState<PortfolioDTO[]>([]);

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
			const landing = await LandingAPI.getAllForCurrentUser(userId);
			const portfolio = await PortfolioAPI.getAllForCurrentUser(userId);
			setLandings(landing);
			setPortfolios(portfolio);
		})();
	});

	return (
		<Layout auth={auth}>
			<h1 className={styles.h1}>Ваши сайты</h1>

			<ul className={styles.siteList}>
				{landings.map((lend) => {
					return <Landing data={lend} key={lend.id} />;
				})}
				{portfolios.map((portf) => {
					return <Portfolio data={portf} key={portf.id} />;
				})}
			</ul>
		</Layout>
	);
};

export default Sites;
