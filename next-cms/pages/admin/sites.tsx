import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserAPI } from '@/api/user.api';
import { LendingDTO } from '@/api/dto/lending.dto';
import { LendingAPI } from '@/api/lending.api';
import styles from '../../styles/Sites.module.css';
import { AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';

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
						return (
							<li>
								<div className={styles.listItem}>
									<label className={styles.label}>{site.headerName}</label>
									<div className={styles.btns}>
										<button className={styles.btn}>
											<span className={styles.icon}>
												<AiOutlineEdit />
											</span>
										</button>
										<button className={styles.btn}>
											<span className={styles.icon}>
												<AiOutlineEye />
											</span>
										</button>
										<button className={styles.btn}>
											<span className={styles.icon}>
												<BiTrash />
											</span>
										</button>
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			</form>
		</Layout>
	);
};

export default Sites;
