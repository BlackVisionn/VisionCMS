import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserAPI } from '@/api/user.api';
import { LendingDTO } from '@/api/dto/lending.dto';
import { LendingAPI } from '@/api/lending.api';
import Site from '@/components/Site';
import styles from '../../styles/Site.module.css';

const Sites = () => {
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
	const [sites, setSites] = useState<LendingDTO[]>([]);

	useEffect(() => {
		async function fetchAll() {
			const resp = await LendingAPI.getAllForCurrentUser(2);
			setSites(resp);
		}
		fetchAll();
	}, []);

	return (
		<Layout auth={auth}>
			<h1 className={styles.h1}>Ваши сайты</h1>
			<form className={styles.form}>
				<ul className={styles.sitesList}>
					{sites.map((site) => {
						return <Site data={site} />;
					})}
				</ul>
			</form>
		</Layout>
	);
};

export default Sites;
