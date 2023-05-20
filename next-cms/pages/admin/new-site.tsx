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
						Ваш сайт не содержит компонентов и будет пустым
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
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Заголовок сайта.</label>
						<input
							type="text"
							className={styles.input}
							onChange={(e) => setHeaderName(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Краткое описание заголовка.</label>
						<input
							type="text"
							className={styles.input}
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
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Ссылка на картинку главного экрана.
						</label>
						<input
							type="text"
							className={styles.input}
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
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Название кнопки раздела "Презентации продукта".
						</label>
						<input
							type="text"
							className={styles.input}
							onChange={(e) => setNavIntroduction(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Заголовок раздела "Презентации продукта".
						</label>
						<input
							type="text"
							className={styles.input}
							onChange={(e) => setIntroductionTitle(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Описание раздела "Презентации продукта".
						</label>
						<input
							type="text"
							className={styles.input}
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
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Название кнопки раздела "О нас".
						</label>
						<input
							type="text"
							className={styles.input}
							onChange={(e) => setNavAbout(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Заголовок раздела "О нас".</label>
						<input
							type="text"
							className={styles.input}
							onChange={(e) => setAboutTitle(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Описание раздела "О нас".</label>
						<input
							type="text"
							className={styles.input}
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
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Название кнопки раздела "Контакты".
						</label>
						<input
							type="text"
							className={styles.input}
							onChange={(e) => setNavContact(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Заголовок раздела "Контакты".
						</label>
						<input
							type="text"
							className={styles.input}
							onChange={(e) => setContactTitle(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Описание раздела "Контакты".</label>
						<input
							type="text"
							className={styles.input}
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
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Название вашей компании для подвала сайта.
						</label>
						<input
							type="text"
							className={styles.input}
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
	const createSite = async (e: SyntheticEvent) => {
		e.preventDefault();
		await LendingAPI.createLending(
			usingHeader,
			usingImg,
			usingIntroduction,
			usingAbout,
			usingContact,
			usingFooter,
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
			userId,
		);
		changeView();
	};

	if (isChoosingPage) {
		view = (
			<div>
				<h1 className={styles.h1}>Выберите шаблон сайта</h1>
				<button className={styles.btn} onClick={changeView}>
					Сайт Лендинг
				</button>
				<button className={styles.btn} onClick={changeView}>
					Сайт Портфолио
				</button>
			</div>
		);
	} else if (isComponentsPage) {
		view = (
			<div>
				<h1 className={styles.h1}>
					Выберите компоненты которые будут использоваться на вашем сайте
				</h1>
				<ul className={styles.componentsList}>
					<li>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								onChange={(e) => setUsingHeader(e.target.checked)}
							/>
							<span className={styles.checkmark}>
								<svg viewBox="0 0 24 24" className={styles.icon}>
									<path
										fill="none"
										stroke="#ffffff"
										strokeWidth="3"
										d="M3,12.5 L8,17.5 L21,4.5"
									/>
								</svg>
							</span>
							Заголовок сайта
						</label>
					</li>
					<li>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								onChange={(e) => setUsingImg(e.target.checked)}
							/>
							<span className={styles.checkmark}>
								<svg viewBox="0 0 24 24" className={styles.icon}>
									<path
										fill="none"
										stroke="#ffffff"
										strokeWidth="3"
										d="M3,12.5 L8,17.5 L21,4.5"
									/>
								</svg>
							</span>
							Картинка
						</label>
					</li>
					<li>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								onChange={(e) => setUsingIntroduction(e.target.checked)}
							/>
							<span className={styles.checkmark}>
								<svg viewBox="0 0 24 24" className={styles.icon}>
									<path
										fill="none"
										stroke="#ffffff"
										strokeWidth="3"
										d="M3,12.5 L8,17.5 L21,4.5"
									/>
								</svg>
							</span>
							Презентация продукта
						</label>
					</li>
					<li>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								onChange={(e) => setUsingAbout(e.target.checked)}
							/>
							<span className={styles.checkmark}>
								<svg viewBox="0 0 24 24" className={styles.icon}>
									<path
										fill="none"
										stroke="#ffffff"
										strokeWidth="3"
										d="M3,12.5 L8,17.5 L21,4.5"
									/>
								</svg>
							</span>
							О нас
						</label>
					</li>
					<li>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								onChange={(e) => setUsingContact(e.target.checked)}
							/>
							<span className={styles.checkmark}>
								<svg viewBox="0 0 24 24" className={styles.icon}>
									<path
										fill="none"
										stroke="#ffffff"
										strokeWidth="3"
										d="M3,12.5 L8,17.5 L21,4.5"
									/>
								</svg>
							</span>
							Контакты
						</label>
					</li>
					<li>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								onChange={(e) => setUsingFooter(e.target.checked)}
							/>
							<span className={styles.checkmark}>
								<svg viewBox="0 0 24 24" className={styles.icon}>
									<path
										fill="none"
										stroke="#ffffff"
										strokeWidth="3"
										d="M3,12.5 L8,17.5 L21,4.5"
									/>
								</svg>
							</span>
							Подвал сайта
						</label>
					</li>
				</ul>

				<button className={styles.btnAction} onClick={setComponents}>
					Применить
				</button>
			</div>
		);
	} else if (isCreationPage) {
		view = (
			<form onSubmit={createSite} className={styles.inputs}>
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

export default NewSite;
