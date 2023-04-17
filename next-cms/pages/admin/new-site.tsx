import Layout from '@/components/Layout';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserAPI } from '@/api/user.api';
import styles from '../../styles/CreateNewSite.module.css';
import { LendingAPI } from '@/api/lending.api';

const NewSite = () => {
	const [auth, setAuth] = useState(false);
	const router = useRouter();
	const [isChoosingPage, setIsChoosingPage] = useState(true);
	const [isComponentsPage, setIsComponentsPage] = useState(false);
	const [isCreationPage, setIsCreationPage] = useState(false);

	const [usingHeader, setUsingHeader] = useState(false);
	const [usingImg, setUsingImg] = useState(false);
	const [usingIntroduction, setUsingIntroduction] = useState(false);
	const [usingAbout, setUsingAbout] = useState(false);
	const [usingContact, setUsingContact] = useState(false);
	const [usingFooter, setUsingFooter] = useState(false);
	const [userId, setUserId] = useState(0);
	let view;

	const changeView = async () => {
		if (isChoosingPage == true && isComponentsPage == false) {
			setIsChoosingPage(false);
			setIsComponentsPage(true);
		} else if (isComponentsPage == true && isCreationPage == false) {
			setIsComponentsPage(false);
			setIsCreationPage(true);
		} else if (isCreationPage == true && isChoosingPage == false) {
			setIsCreationPage(false);
			setIsChoosingPage(true);
		}
	};
	const createComponents = async (e: SyntheticEvent) => {
		e.preventDefault();
		await LendingAPI.createLending(
			usingHeader,
			usingImg,
			usingIntroduction,
			usingAbout,
			usingContact,
			usingFooter,
			userId,
		);
		changeView();
	};
	const updateComponents = async (e: SyntheticEvent) => {
		e.preventDefault();
		changeView();
	};

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
	if (isChoosingPage) {
		view = (
			<div>
				<h1 className={styles.h1}>Выберите тип сайта</h1>
				<button className={styles.btn} onClick={changeView}>
					Сайт Лендинг
				</button>
			</div>
		);
	} else if (isComponentsPage) {
		view = (
			<form onSubmit={createComponents}>
				<h1 className={styles.h1}>
					Выберите компоненты которые будут использоваться на вашем сайте
				</h1>
				<ul className={styles.componentsList}>
					<li>
						<input
							type="checkbox"
							onChange={(e) => setUsingHeader(e.target.checked)}
						/>
						<label htmlFor="">Заголовок сайта</label>
					</li>
					<li>
						<input
							type="checkbox"
							onChange={(e) => setUsingImg(e.target.checked)}
						/>
						<label htmlFor="">Картинка</label>
					</li>
					<li>
						<input
							type="checkbox"
							onChange={(e) => setUsingIntroduction(e.target.checked)}
						/>
						<label htmlFor="">Презентация продукта</label>
					</li>
					<li>
						<input
							type="checkbox"
							onChange={(e) => setUsingAbout(e.target.checked)}
						/>
						<label htmlFor="">О нас</label>
					</li>
					<li>
						<input
							type="checkbox"
							onChange={(e) => setUsingContact(e.target.checked)}
						/>
						<label htmlFor="">Контакты</label>
					</li>
					<li>
						<input
							type="checkbox"
							onChange={(e) => setUsingFooter(e.target.checked)}
						/>
						<label htmlFor="">Подвал сайта</label>
					</li>
				</ul>

				<button type="submit" className={styles.btnAction}>
					Применить
				</button>
			</form>
		);
	} else if (isCreationPage) {
		view = (
			<form onSubmit={updateComponents}>
				<h1 className={styles.h1}>Введите свои значения компонентов</h1>

				<button type="submit" className={styles.btnAction}>
					Применить
				</button>
			</form>
		);
	}
	return <Layout auth={auth}>{view}</Layout>;
};

export default NewSite;
