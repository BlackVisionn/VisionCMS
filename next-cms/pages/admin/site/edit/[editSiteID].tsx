import Layout from '@/components/Layout';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserAPI } from '@/api/user.api';
import styles from '../../../../styles/CreateNewSite.module.css';
import { LendingAPI } from '@/api/lending.api';

const SiteEdit = () => {
	const [site, setSite] = useState<any>([]);
	const [auth, setAuth] = useState(false);
	const router = useRouter();
	const siteID = Number(router.query.editSiteID);

	const [isConfrimationPage, setIsConfirmationPage] = useState(true);
	const [isUpdatingPage, setIsUpdatingPage] = useState(false);

	const [usingHeader, setUsingHeader] = useState();
	const [usingImg, setUsingImg] = useState(false);
	const [usingIntroduction, setUsingIntroduction] = useState(false);
	const [usingAbout, setUsingAbout] = useState(false);
	const [usingContact, setUsingContact] = useState(false);
	const [usingFooter, setUsingFooter] = useState(false);

	const [headerName, setHeaderName] = useState<any>();
	const [headerDescription, setHeaderDescription] = useState<any>();
	const [mainImg, setMainImg] = useState<any>();
	const [navIntroduction, setNavIntroduction] = useState<any>();
	const [introductionTitle, setIntroductionTitle] = useState<any>();
	const [introductionDescription, setIntroductionDescription] = useState<any>();
	const [navAbout, setNavAbout] = useState<any>();
	const [aboutTitle, setAboutTitle] = useState<any>();
	const [aboutDescription, setAboutDescription] = useState<any>();
	const [navContact, setNavContact] = useState<any>();
	const [contactTitle, setContactTitle] = useState<any>();
	const [contactDescription, setContactDescription] = useState<any>();
	const [footerCompany, setFooterCompany] = useState<any>();
	const [userId, setUserId] = useState(0);
	let view;

	const [header, setHeader] = useState<any>();
	const [img, setImg] = useState<any>();
	const [introduction, setIntroduction] = useState<any>();
	const [about, setAbout] = useState<any>();
	const [contact, setContact] = useState<any>();
	const [footer, setFooter] = useState<any>();
	const [empty, setEmpty] = useState<any>();

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
			for (let i = 0; i < resp.length; i++) {
				if (resp[i].id == Number(siteID)) {
					setSite(resp[i]);
				}
			}
			setUsingHeader(site.useHeader);
			setUsingImg(site.useMainImg);
			setUsingIntroduction(site.useNavIntroduction);
			setUsingAbout(site.useNavAbout);
			setUsingContact(site.useNavContact);
			setUsingFooter(site.useFooter);
		})();
	});

	const updateSite = async (e: SyntheticEvent) => {
		e.preventDefault();
		await LendingAPI.updateLending(
			siteID,
			headerName,
			headerDescription,
			mainImg,
			navIntroduction,
			introductionTitle,
			introductionDescription,
			navAbout,
			aboutTitle,
			aboutDescription,
			navContact,
			contactTitle,
			contactDescription,
			footerCompany,
		);
		await router.push('/admin/sites');
	};

	const returnToSites = async () => {
		await router.push('/admin/sites');
	};

	const changeView = async () => {
		if (isConfrimationPage == true && isUpdatingPage == false) {
			setIsConfirmationPage(false);
			setIsUpdatingPage(true);
		}
	};

	const setComponents = async () => {
		let menu;
		if (
			!usingHeader &&
			!usingImg &&
			!usingIntroduction &&
			!usingAbout &&
			!usingContact &&
			!usingFooter
		) {
			menu = (
				<div>
					<h1 className={styles.h1}>
						Ваш сайт не содержит компонентов и является пустым!
					</h1>
				</div>
			);
			setEmpty(menu);
		} else {
			menu = <div></div>;
			setEmpty(menu);
		}

		if (usingHeader) {
			menu = (
				<div>
					<h1 className={styles.h1}>
						Введите название вашего сайта и его описание
					</h1>
					<div>
						<label htmlFor="">
							Заголовок сайта. Текущее значение "{site.headerName}"
						</label>
						<input
							className={styles.inputs}
							type="text"
							onChange={(e) => setHeaderName(e.target.value)}
						/>
						<label htmlFor="">
							Краткое описание заголовка. Текущее значение "
							{site.headerDescription}"
						</label>
						<input
							className={styles.inputs}
							type="text"
							onChange={(e) => setHeaderDescription(e.target.value)}
						/>
					</div>
				</div>
			);
			setHeader(menu);
		} else {
			menu = <div></div>;
			setHeader(menu);
		}
		if (usingImg) {
			menu = (
				<div>
					<h1 className={styles.h1}>Введите ссылку на свою картинку</h1>
					<div>
						<label htmlFor="">
							Ссылка на картинку главного экрана. Текущее значение "
							{site.mainImg}"
						</label>
						<input
							className={styles.inputs}
							type="text"
							onChange={(e) => setMainImg(e.target.value)}
						/>
					</div>
				</div>
			);
			setImg(menu);
		} else {
			menu = <div></div>;
			setImg(menu);
		}
		if (usingIntroduction) {
			menu = (
				<div>
					<h1 className={styles.h1}>
						Введите название вашей кнопки навигации её заголовок и описание
					</h1>
					<div>
						<label htmlFor="">
							Название кнопки раздела "Презентации продукта". Текущее значение "
							{site.navIntroduction}"
						</label>
						<input
							className={styles.inputs}
							type="text"
							onChange={(e) => setNavIntroduction(e.target.value)}
						/>
						<label htmlFor="">
							Заголовок раздела "Презентации продукта". "Текущее значение "
							{site.introductionTitle}"
						</label>
						<input
							className={styles.inputs}
							type="text"
							onChange={(e) => setIntroductionTitle(e.target.value)}
						/>
						<label htmlFor="">
							Описание раздела "Презентации продукта". Текущее значение "
							{site.introductionDescription}"
						</label>
						<input
							className={styles.inputs}
							type="text"
							onChange={(e) => setIntroductionDescription(e.target.value)}
						/>
					</div>
				</div>
			);
			setIntroduction(menu);
		} else {
			menu = <div></div>;
			setIntroduction(menu);
		}
		if (usingAbout) {
			menu = (
				<div>
					<h1 className={styles.h1}>
						Введите название вашей кнопки навигации её заголовок и описание
					</h1>
					<div>
						<label htmlFor="">
							Название кнопки раздела "О нас". Текущее значение "{site.navAbout}
							"
						</label>
						<input
							className={styles.inputs}
							type="text"
							onChange={(e) => setNavAbout(e.target.value)}
						/>
						<label htmlFor="">
							Заголовок раздела "О нас". Текущее значение "{site.aboutTitle}"
						</label>
						<input
							className={styles.inputs}
							type="text"
							onChange={(e) => setAboutTitle(e.target.value)}
						/>
						<label htmlFor="">
							Описание раздела "О нас". Текущее значение "
							{site.aboutDescription}"
						</label>
						<input
							className={styles.inputs}
							type="text"
							onChange={(e) => setAboutDescription(e.target.value)}
						/>
					</div>
				</div>
			);
			setAbout(menu);
		} else {
			menu = <div></div>;
			setAbout(menu);
		}
		if (usingContact) {
			menu = (
				<div>
					<h1 className={styles.h1}>
						Введите название вашей кнопки навигации её заголовок и описание
					</h1>
					<div>
						<label htmlFor="">
							Название кнопки раздела "Контакты". Текущее значение "
							{site.navContact}"
						</label>
						<input
							className={styles.inputs}
							type="text"
							onChange={(e) => setNavContact(e.target.value)}
						/>
						<label htmlFor="">
							Заголовок раздела "Контакты". Текущее значение "
							{site.contactTitle}"
						</label>
						<input
							className={styles.inputs}
							type="text"
							onChange={(e) => setContactTitle(e.target.value)}
						/>
						<label htmlFor="">
							Описание раздела "Контакты". Текущее значение "
							{site.contactDescription}"
						</label>
						<input
							className={styles.inputs}
							type="text"
							onChange={(e) => setContactDescription(e.target.value)}
						/>
					</div>
				</div>
			);
			setContact(menu);
		} else {
			menu = <div></div>;
			setContact(menu);
		}
		if (usingFooter) {
			menu = (
				<div>
					<h1 className={styles.h1}>
						Введите название вашей комании для отображения в подвале сайта
					</h1>
					<div>
						<label htmlFor="">
							Название вашей компании для подвала сайта. Текущее значение "
							{site.footerCompany}"
						</label>
						<input
							className={styles.inputs}
							type="text"
							onChange={(e) => setFooterCompany(e.target.value)}
						/>
					</div>
				</div>
			);
			setFooter(menu);
		} else {
			menu = <div></div>;
			setFooter(menu);
		}
		changeView();
	};

	if (isConfrimationPage) {
		view = (
			<div>
				<h1>Вы хотите изменить сайт с названием "{site.headerName}"?</h1>
				<button className={styles.btnAction} onClick={setComponents}>
					ДА
				</button>
				<button className={styles.btnAction} onClick={returnToSites}>
					НЕТ
				</button>
			</div>
		);
	} else if (isUpdatingPage) {
		view = (
			<form onSubmit={updateSite} className={styles.inputs}>
				{empty}
				{header}
				{img}
				{introduction}
				{about}
				{contact}
				{footer}

				<button type="submit" className={styles.btnAction}>
					Применить
				</button>
			</form>
		);
	}
	return <Layout auth={auth}>{view}</Layout>;
};

export default SiteEdit;
