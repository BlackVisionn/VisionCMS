import { UserAPI } from '@/api/user.api';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import styles from '../../../styles/CreateNewSite.module.css';

const NewSiteTemplate = () => {
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

	const changeToPortfolioComponentsPage = async () => {
		router.push('portfolio/components');
	};
	const changeToLendingComponentsPage = async () => {
		router.push('lending/components');
	};

	return (
		<Layout auth={auth}>
			<div>
				<h1 className={styles.h1}>Выберите шаблон сайта</h1>
				<button
					className={styles.btn}
					onClick={changeToPortfolioComponentsPage}
				>
					Сайт Портфолио
				</button>
				<button className={styles.btn} onClick={changeToLendingComponentsPage}>
					Сайт Лендинг
				</button>
			</div>
		</Layout>
	);
};

export default NewSiteTemplate;
