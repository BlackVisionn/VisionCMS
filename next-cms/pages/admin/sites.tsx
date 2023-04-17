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
	const [userId, setUserId] = useState(0);
	const [sites, setSites] = useState<LendingDTO[]>([]);

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
			const resp = await LendingAPI.getAllForCurrentUser(userId);
			setSites(resp);
		})();
	});

	return (
		<Layout auth={auth}>
			<h1 className={styles.h1}>Ваши сайты</h1>
			<form className={styles.form}>
				<ul className={styles.sitesList}>
					{sites.map((site) => {
						return <Site data={site} key={site.id} />;
					})}
				</ul>
			</form>
		</Layout>
	);
};

export default Sites;
