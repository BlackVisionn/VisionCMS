import Layout from '@/components/Layout';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserAPI } from '@/api/user.api';
import { LandingAPI } from '@/api/landing.api';
import styles from '../../../../../styles/CreateNewSite.module.css';

const LandingEdit = () => {
	const [auth, setAuth] = useState(false);
	const router = useRouter();
	const siteID = Number(router.query.editLandingID);
	const [userId, setUserId] = useState(0);

	//Components using
	const [useHeader, setUseHeader] = useState(false);
	const [useFeatures, setUseFeatures] = useState(false);
	const [useAbout, setUseAbout] = useState(false);
	const [useServices, setUseServices] = useState(false);
	const [usePortfolio, setUsePortfolio] = useState(false);
	const [useTeam, setUseTeam] = useState(false);
	const [useContact, setUseContact] = useState(false);
	const [useFooter, setUseFooter] = useState(false);

	//Components
	const [templateName, setTemplateName] = useState<any>();

	const [headerName, setHeaderName] = useState<any>();
	const [headerDescription, setHeaderDescription] = useState<any>();
	const [buttonName, setButtonName] = useState<any>();
	const [featuresNavItemName, setFeaturesNavItemName] = useState<any>();
	const [aboutNavItemName, setAboutNavItemName] = useState<any>();
	const [servicesNavItemName, setServicesNavItemName] = useState<any>();
	const [portfolioNavItemName, setPortfolioNavItemName] = useState<any>();
	const [teamNavItemName, setTeamNavItemName] = useState<any>();
	const [contactNavItemName, setContactNavItemName] = useState<any>();
	const [featuresHeader, setFeaturesHeader] = useState<any>();
	const [firstFeaturesItemList, setFirstFeaturesItemList] = useState<any>();
	const [secondFeaturesItemList, setSecondFeaturesItemList] = useState<any>();
	const [thirdFeaturesItemList, setThirdFeaturesItemList] = useState<any>();
	const [aboutHeader, setAboutHeader] = useState<any>();
	const [aboutDescription, setAboutDescription] = useState<any>();
	const [servicesHeader, setServicesHeader] = useState<any>();
	const [firstServicesItemList, setFirstServicesItemList] = useState<any>();
	const [secondServicesItemList, setSecondServicesItemList] = useState<any>();
	const [thirdServicesItemList, setThirdServicesItemList] = useState<any>();
	const [portfolioHeader, setPortfolioHeader] = useState<any>();
	const [portfolioDescription, setPortfolioDescription] = useState<any>();
	const [
		firstPortoflioItemListProjectDescription,
		setFirstPortoflioItemListProjectDescription,
	] = useState<any>();
	const [
		firstPortoflioItemListProjectName,
		setFirstPortoflioItemListProjectName,
	] = useState<any>();
	const [
		firstPortoflioItemListProjectUrl,
		setFirstPortoflioItemListProjectUrl,
	] = useState<any>();
	const [
		secondPortoflioItemListProjectDescription,
		setSecondPortoflioItemListProjectDescription,
	] = useState<any>();
	const [
		secondPortoflioItemListProjectName,
		setSecondPortoflioItemListProjectName,
	] = useState<any>();
	const [
		secondPortoflioItemListProjectUrl,
		setSecondPortoflioItemListProjectUrl,
	] = useState<any>();
	const [
		thirdPortoflioItemListProjectDescription,
		setThirdPortoflioItemListProjectDescription,
	] = useState<any>();
	const [
		thirdPortoflioItemListProjectName,
		setThirdPortoflioItemListProjectName,
	] = useState<any>();
	const [
		thirdPortoflioItemListProjectUrl,
		setThirdPortoflioItemListProjectUrl,
	] = useState<any>();
	const [teamHeader, setTeamHeader] = useState<any>();
	const [teamDescription, setTeamDescription] = useState<any>();
	const [firstTeamItemListEmployeeName, setFirstTeamItemListEmployeeName] =
		useState<any>();
	const [
		firstTeamItemListEmployeePosition,
		setFirstTeamItemListEmployeePosition,
	] = useState<any>();
	const [secondTeamItemListEmployeeName, setSecondTeamItemListEmployeeName] =
		useState<any>();
	const [
		secondTeamItemListEmployeePosition,
		setSecondTeamItemListEmployeePosition,
	] = useState<any>();
	const [thirdTeamItemListEmployeeName, setThirdTeamItemListEmployeeName] =
		useState<any>();
	const [
		thirdTeamItemListEmployeePosition,
		setThirdTeamItemListEmployeePosition,
	] = useState<any>();
	const [contactHeader, setContactHeader] = useState<any>();
	const [contactDescription, setContactDescription] = useState<any>();
	const [firstContactItemListName, setFirstContactItemListName] =
		useState<any>();
	const [firstContactItemListInfo, setFirstContactItemListInfo] =
		useState<any>();
	const [secondContactItemListName, setSecondContactItemListName] =
		useState<any>();
	const [secondContactItemListInfo, setSecondContactItemListInfo] =
		useState<any>();
	const [thirdContactItemListName, setThirdContactItemListName] =
		useState<any>();
	const [thirdContactItemListInfo, setThirdContactItemListInfo] =
		useState<any>();
	const [footerDescription, setFooterDescription] = useState<any>();

	let view;
	const [isConfirmationPage, setIsConfirmationPage] = useState(true);
	const [isComponentsPage, setIsComponentsPage] = useState(false);
	const [isUpdatingPage, setIsUpdatingPage] = useState(false);

	const [navFeatures, setNavFeatures] = useState<any>();
	const [navAbout, setNavAbout] = useState<any>();
	const [navServices, setNavServices] = useState<any>();
	const [navPortfolio, setNavPortfolio] = useState<any>();
	const [navTeam, setNavTeam] = useState<any>();
	const [navContact, setNavContact] = useState<any>();
	const [btnContact, setBtnContact] = useState<any>();

	const [empty, setEmptyContent] = useState<any>();
	const [header, setHeaderContent] = useState<any>();
	const [features, setFeaturesContent] = useState<any>();
	const [about, setAboutContent] = useState<any>();
	const [services, setServicesContent] = useState<any>();
	const [portfolio, setPortfolioContent] = useState<any>();
	const [team, setTeamContent] = useState<any>();
	const [contact, setContactContent] = useState<any>();
	const [footer, setFooterContent] = useState<any>();
	const templateNameInput = (
		<div>
			<h1 className={styles.h1}>Введите название своего шаблона.</h1>
			<div className={styles.inputWrapper}>
				<label className={styles.label}>Название шаблона.</label>
				<input
					type="text"
					placeholder={templateName}
					className={styles.input}
					onChange={(e) => setTemplateName(e.target.value)}
				/>
			</div>
		</div>
	);

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
		})();
	});

	const changeView = async () => {
		if (isConfirmationPage == true && isComponentsPage == false) {
			setIsConfirmationPage(false);
			setIsComponentsPage(true);
		}
		if (isComponentsPage == true && isUpdatingPage == false) {
			setIsComponentsPage(false);
			setIsUpdatingPage(true);
		} else if (
			isUpdatingPage == true &&
			isComponentsPage == false &&
			isConfirmationPage == false
		) {
			setIsUpdatingPage(false);
		}
	};

	const setComponents = async () => {
		let content;
		if (
			!useHeader &&
			!useFeatures &&
			!useAbout &&
			!useServices &&
			!usePortfolio &&
			!useTeam &&
			!useContact &&
			!useFooter
		) {
			content = (
				<div>
					<h1 className={styles.h1}>
						Ваш сайт не содержит компонентов и будет пустым!
					</h1>
				</div>
			);
			setEmptyContent(content);
		} else {
			content = <div></div>;
			setEmptyContent(content);
		}

		if (useHeader) {
			let navInput;
			let btnInput;
			if (useFeatures) {
				navInput = (
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Введите название первого раздела навигационной панели.
						</label>
						<input
							type="text"
							placeholder={featuresNavItemName}
							className={styles.input}
							onChange={(e) => setFeaturesNavItemName(e.target.value)}
						/>
					</div>
				);
				setNavFeatures(navInput);
			} else {
				navInput = <div></div>;
				setNavFeatures(navInput);
			}
			if (useAbout) {
				navInput = (
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Введите название второго раздела навигационной панели.
						</label>
						<input
							type="text"
							placeholder={aboutNavItemName}
							className={styles.input}
							onChange={(e) => setAboutNavItemName(e.target.value)}
						/>
					</div>
				);
				setNavAbout(navInput);
			} else {
				navInput = <div></div>;
				setNavAbout(navInput);
			}
			if (useServices) {
				navInput = (
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Введите название третьего раздела навигационной панели.
						</label>
						<input
							type="text"
							placeholder={servicesNavItemName}
							className={styles.input}
							onChange={(e) => setServicesNavItemName(e.target.value)}
						/>
					</div>
				);
				setNavServices(navInput);
			} else {
				navInput = <div></div>;
				setNavServices(navInput);
			}
			if (usePortfolio) {
				navInput = (
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Введите название четвертого раздела навигационной панели.
						</label>
						<input
							type="text"
							placeholder={portfolioNavItemName}
							className={styles.input}
							onChange={(e) => setPortfolioNavItemName(e.target.value)}
						/>
					</div>
				);
				setNavPortfolio(navInput);
			} else {
				navInput = <div></div>;
				setNavPortfolio(navInput);
			}
			if (useTeam) {
				navInput = (
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Введите название пятого раздела навигационной панели.
						</label>
						<input
							type="text"
							placeholder={teamNavItemName}
							className={styles.input}
							onChange={(e) => setTeamNavItemName(e.target.value)}
						/>
					</div>
				);
				setNavTeam(navInput);
			} else {
				navInput = <div></div>;
				setNavTeam(navInput);
			}
			if (useContact) {
				navInput = (
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Введите название шестого раздела навигационной панели.
						</label>
						<input
							type="text"
							placeholder={contactNavItemName}
							className={styles.input}
							onChange={(e) => setContactNavItemName(e.target.value)}
						/>
					</div>
				);
				btnInput = (
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Введите название кнопки, которая ведет на последний раздел
							(Например: "Свяжитесь с нами").
						</label>
						<input
							type="text"
							placeholder={buttonName}
							className={styles.input}
							onChange={(e) => setButtonName(e.target.value)}
						/>
					</div>
				);
				setBtnContact(btnInput);
				setNavContact(navInput);
			} else {
				btnInput = <div></div>;
				navInput = <div></div>;
				setBtnContact(btnInput);
				setNavContact(navInput);
			}

			content = (
				<div>
					<h1 className={styles.h1}>
						Введите свой заголовок сайта, краткое описание и название разделов
						навигационной панели.
					</h1>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Заголовок сайта.</label>
						<input
							type="text"
							placeholder={headerName}
							className={styles.input}
							onChange={(e) => setHeaderName(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Краткое описание заголовка.</label>
						<input
							type="text"
							placeholder={headerDescription}
							className={styles.input}
							onChange={(e) => setHeaderDescription(e.target.value)}
						/>
					</div>
					{btnContact}
					{navFeatures}
					{navAbout}
					{navServices}
					{navPortfolio}
					{navTeam}
					{navContact}
				</div>
			);
			setHeaderContent(content);
		} else {
			content = <div></div>;
			setHeaderContent(content);
		}

		if (useFeatures) {
			content = (
				<div>
					<h1 className={styles.h1}>Введите особенности вашего продукта.</h1>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Заголовок раздела "Особенности".
						</label>
						<input
							type="text"
							placeholder={featuresHeader}
							className={styles.input}
							onChange={(e) => setFeaturesHeader(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Введите первую особенность.</label>
						<input
							type="text"
							placeholder={firstFeaturesItemList}
							className={styles.input}
							onChange={(e) => setFirstFeaturesItemList(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Введите вторую особенность.</label>
						<input
							type="text"
							placeholder={secondFeaturesItemList}
							className={styles.input}
							onChange={(e) => setSecondFeaturesItemList(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Введите третью особенность.</label>
						<input
							type="text"
							placeholder={thirdFeaturesItemList}
							className={styles.input}
							onChange={(e) => setThirdFeaturesItemList(e.target.value)}
						/>
					</div>
				</div>
			);
			setFeaturesContent(content);
		} else {
			content = <div></div>;
			setFeaturesContent(content);
		}
		if (useAbout) {
			content = (
				<div>
					<h1 className={styles.h1}>Введите информацию раздела "О нас".</h1>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Заголовок раздела "О нас".</label>
						<input
							type="text"
							placeholder={aboutHeader}
							className={styles.input}
							onChange={(e) => setAboutHeader(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Введит параграф раздела "О нас".
						</label>
						<input
							type="text"
							placeholder={aboutDescription}
							className={styles.input}
							onChange={(e) => setAboutDescription(e.target.value)}
						/>
					</div>
				</div>
			);
			setAboutContent(content);
		} else {
			content = <div></div>;
			setAboutContent(content);
		}
		if (useServices) {
			content = (
				<div>
					<h1 className={styles.h1}>Введите информацию о ваших услугах.</h1>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Заголовок раздела "Услуги".</label>
						<input
							type="text"
							placeholder={servicesHeader}
							className={styles.input}
							onChange={(e) => setServicesHeader(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Первая услуга.</label>
						<input
							type="text"
							placeholder={firstServicesItemList}
							className={styles.input}
							onChange={(e) => setFirstServicesItemList(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Вторая услуга.</label>
						<input
							type="text"
							placeholder={secondServicesItemList}
							className={styles.input}
							onChange={(e) => setSecondServicesItemList(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Третья услуга.</label>
						<input
							type="text"
							placeholder={thirdServicesItemList}
							className={styles.input}
							onChange={(e) => setThirdServicesItemList(e.target.value)}
						/>
					</div>
				</div>
			);
			setServicesContent(content);
		} else {
			content = <div></div>;
			setServicesContent(content);
		}
		if (usePortfolio) {
			content = (
				<div>
					<h1 className={styles.h1}>Введите информацию о ваших портфолио.</h1>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Заголовок раздела "Портфолио".
						</label>
						<input
							type="text"
							placeholder={portfolioHeader}
							className={styles.input}
							onChange={(e) => setPortfolioHeader(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Краткое описание раздела "Портфолио".
						</label>
						<input
							type="text"
							placeholder={portfolioDescription}
							className={styles.input}
							onChange={(e) => setPortfolioDescription(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Краткое описание первого проекта-портфолио.
						</label>
						<input
							type="text"
							placeholder={firstPortoflioItemListProjectDescription}
							className={styles.input}
							onChange={(e) =>
								setFirstPortoflioItemListProjectDescription(e.target.value)
							}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Название первого проекта-портфолио.
						</label>
						<input
							type="text"
							placeholder={firstPortoflioItemListProjectName}
							className={styles.input}
							onChange={(e) =>
								setFirstPortoflioItemListProjectName(e.target.value)
							}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Ссылка на первый проект-портфолио.
						</label>
						<input
							type="text"
							placeholder={firstPortoflioItemListProjectUrl}
							className={styles.input}
							onChange={(e) =>
								setFirstPortoflioItemListProjectUrl(e.target.value)
							}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Краткое описание второго проекта-портфолио.
						</label>
						<input
							type="text"
							placeholder={secondPortoflioItemListProjectDescription}
							className={styles.input}
							onChange={(e) =>
								setSecondPortoflioItemListProjectDescription(e.target.value)
							}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Название второго проекта-портфолио.
						</label>
						<input
							type="text"
							placeholder={secondPortoflioItemListProjectName}
							className={styles.input}
							onChange={(e) =>
								setSecondPortoflioItemListProjectName(e.target.value)
							}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Ссылка на второй проект-портфолио.
						</label>
						<input
							type="text"
							placeholder={secondPortoflioItemListProjectUrl}
							className={styles.input}
							onChange={(e) =>
								setSecondPortoflioItemListProjectUrl(e.target.value)
							}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Краткое описание третьего проекта-портфолио.
						</label>
						<input
							type="text"
							placeholder={thirdPortoflioItemListProjectDescription}
							className={styles.input}
							onChange={(e) =>
								setThirdPortoflioItemListProjectDescription(e.target.value)
							}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Название третьего проекта-портфолио.
						</label>
						<input
							type="text"
							placeholder={thirdPortoflioItemListProjectName}
							className={styles.input}
							onChange={(e) =>
								setThirdPortoflioItemListProjectName(e.target.value)
							}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Ссылка на третий проект-портфолио.
						</label>
						<input
							type="text"
							placeholder={thirdPortoflioItemListProjectUrl}
							className={styles.input}
							onChange={(e) =>
								setThirdPortoflioItemListProjectUrl(e.target.value)
							}
						/>
					</div>
				</div>
			);
			setPortfolioContent(content);
		} else {
			content = <div></div>;
			setPortfolioContent(content);
		}
		if (useTeam) {
			content = (
				<div>
					<h1 className={styles.h1}>Введите информацию о вашей команде.</h1>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Заголовок раздела "Команда".</label>
						<input
							type="text"
							placeholder={teamHeader}
							className={styles.input}
							onChange={(e) => setTeamHeader(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Краткое описание раздела "Команда".
						</label>
						<input
							type="text"
							placeholder={teamDescription}
							className={styles.input}
							onChange={(e) => setTeamDescription(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Фамилия Имя первого члена команды.
						</label>
						<input
							type="text"
							placeholder={firstTeamItemListEmployeeName}
							className={styles.input}
							onChange={(e) => setFirstTeamItemListEmployeeName(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Должность первого члена команды.
						</label>
						<input
							type="text"
							placeholder={firstTeamItemListEmployeePosition}
							className={styles.input}
							onChange={(e) =>
								setFirstTeamItemListEmployeePosition(e.target.value)
							}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Фамилия Имя второго члена команды.
						</label>
						<input
							type="text"
							placeholder={secondTeamItemListEmployeeName}
							className={styles.input}
							onChange={(e) =>
								setSecondTeamItemListEmployeeName(e.target.value)
							}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Должность второго члена команды.
						</label>
						<input
							type="text"
							placeholder={secondTeamItemListEmployeePosition}
							className={styles.input}
							onChange={(e) =>
								setSecondTeamItemListEmployeePosition(e.target.value)
							}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Фамилия Имя третьего члена команды.
						</label>
						<input
							type="text"
							placeholder={thirdTeamItemListEmployeeName}
							className={styles.input}
							onChange={(e) => setThirdTeamItemListEmployeeName(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Должность третьего члена команды.
						</label>
						<input
							type="text"
							placeholder={thirdTeamItemListEmployeePosition}
							className={styles.input}
							onChange={(e) =>
								setThirdTeamItemListEmployeePosition(e.target.value)
							}
						/>
					</div>
				</div>
			);
			setTeamContent(content);
		} else {
			content = <div></div>;
			setTeamContent(content);
		}
		if (useContact) {
			content = (
				<div>
					<h1 className={styles.h1}>
						Введите информацию раздела "Контакты" для связи с вами.
					</h1>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Заголовок раздела "Контакты".
						</label>
						<input
							type="text"
							placeholder={contactHeader}
							className={styles.input}
							onChange={(e) => setContactHeader(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Краткое описание раздела "Контакты".
						</label>
						<input
							type="text"
							placeholder={contactDescription}
							className={styles.input}
							onChange={(e) => setContactDescription(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Название первого элемента раздела "Контакты".
						</label>
						<input
							type="text"
							placeholder={firstContactItemListName}
							className={styles.input}
							onChange={(e) => setFirstContactItemListName(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Контактная информация первого элемента раздела "Контакты".
						</label>
						<input
							type="text"
							placeholder={firstContactItemListInfo}
							className={styles.input}
							onChange={(e) => setFirstContactItemListInfo(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Название второго элемента раздела "Контакты".
						</label>
						<input
							type="text"
							placeholder={secondContactItemListName}
							className={styles.input}
							onChange={(e) => setSecondContactItemListName(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Контактная информация второго элемента раздела "Контакты".
						</label>
						<input
							type="text"
							placeholder={secondContactItemListInfo}
							className={styles.input}
							onChange={(e) => setSecondContactItemListInfo(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Название третьего элемента раздела "Контакты".
						</label>
						<input
							type="text"
							placeholder={thirdContactItemListName}
							className={styles.input}
							onChange={(e) => setThirdContactItemListName(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Контактная информация третьего элемента раздела "Контакты".
						</label>
						<input
							type="text"
							placeholder={thirdContactItemListInfo}
							className={styles.input}
							onChange={(e) => setThirdContactItemListInfo(e.target.value)}
						/>
					</div>
				</div>
			);
			setContactContent(content);
		} else {
			content = <div></div>;
			setContactContent(content);
		}
		if (useFooter) {
			content = (
				<div>
					<h1 className={styles.h1}>Введите подвал сайта.</h1>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Подвал сайта (Пример: © 2023 Ваш лендинг. Все права защищены.).
						</label>
						<input
							type="text"
							placeholder={footerDescription}
							className={styles.input}
							onChange={(e) => setFooterDescription(e.target.value)}
						/>
					</div>
				</div>
			);
			setFooterContent(content);
		} else {
			content = <div></div>;
			setFooterContent(content);
		}
	};

	const updateSiteInfo = async () => {
		LandingAPI.updateLanding(
			siteID,
			templateName,
			headerName,
			headerDescription,
			buttonName,
			featuresNavItemName,
			aboutNavItemName,
			servicesNavItemName,
			portfolioNavItemName,
			teamNavItemName,
			contactNavItemName,
			featuresHeader,
			firstFeaturesItemList,
			secondFeaturesItemList,
			thirdFeaturesItemList,
			aboutHeader,
			aboutDescription,
			servicesHeader,
			firstServicesItemList,
			secondServicesItemList,
			thirdServicesItemList,
			portfolioHeader,
			portfolioDescription,
			firstPortoflioItemListProjectDescription,
			firstPortoflioItemListProjectName,
			firstPortoflioItemListProjectUrl,
			secondPortoflioItemListProjectDescription,
			secondPortoflioItemListProjectName,
			secondPortoflioItemListProjectUrl,
			thirdPortoflioItemListProjectDescription,
			thirdPortoflioItemListProjectName,
			thirdPortoflioItemListProjectUrl,
			teamHeader,
			teamDescription,
			firstTeamItemListEmployeeName,
			firstTeamItemListEmployeePosition,
			secondTeamItemListEmployeeName,
			secondTeamItemListEmployeePosition,
			thirdTeamItemListEmployeeName,
			thirdTeamItemListEmployeePosition,
			contactHeader,
			contactDescription,
			firstContactItemListName,
			firstContactItemListInfo,
			secondContactItemListName,
			secondContactItemListInfo,
			thirdContactItemListName,
			thirdContactItemListInfo,
			footerDescription,
		);
		changeView();
	};

	const changeToUpdatingPage = async (e: SyntheticEvent) => {
		e.preventDefault();
		const resp = await LandingAPI.getLandingData(siteID);
		LandingAPI.updateLandingComponents(
			resp.id,
			useHeader,
			useFeatures,
			useAbout,
			useServices,
			usePortfolio,
			useTeam,
			useContact,
			useFooter,
		);
		setComponents();
		changeView();
	};

	const changeToComponentsPage = async (e: SyntheticEvent) => {
		e.preventDefault();
		const resp = await LandingAPI.getLandingData(siteID);
		setUseHeader(resp.useHeader);
		setUseFeatures(resp.useFeatures);
		setUseAbout(resp.useAbout);
		setUseServices(resp.useServices);
		setUsePortfolio(resp.usePortfolio);
		setUseTeam(resp.useTeam);
		setUseContact(resp.useContact);
		setUseFooter(resp.useFooter);

		setTemplateName(resp.landing.templateName);

		setHeaderName(resp.landing.headerName);
		setHeaderDescription(resp.landing.headerDescription);
		setButtonName(resp.landing.buttonName);
		setFeaturesNavItemName(resp.landing.featuresNavItemName);
		setAboutNavItemName(resp.landing.aboutNavItemName);
		setServicesNavItemName(resp.landing.servicesNavItemName);
		setPortfolioNavItemName(resp.landing.portfolioNavItemName);
		setTeamNavItemName(resp.landing.teamNavItemName);
		setContactNavItemName(resp.landing.contactNavItemName);
		setFeaturesHeader(resp.landing.featuresHeader);
		setFirstFeaturesItemList(resp.landing.firstFeaturesItemList);
		setSecondFeaturesItemList(resp.landing.secondFeaturesItemList);
		setThirdFeaturesItemList(resp.landing.thirdFeaturesItemList);
		setAboutHeader(resp.landing.aboutHeader);
		setAboutDescription(resp.landing.aboutDescription);
		setServicesHeader(resp.landing.servicesHeader);
		setFirstServicesItemList(resp.landing.firstServicesItemList);
		setSecondServicesItemList(resp.landing.secondServicesItemList);
		setThirdServicesItemList(resp.landing.thirdServicesItemList);
		setPortfolioHeader(resp.landing.portfolioHeader);
		setPortfolioDescription(resp.landing.portfolioDescription);
		setFirstPortoflioItemListProjectDescription(
			resp.landing.firstPortoflioItemListProjectDescription,
		);
		setFirstPortoflioItemListProjectName(
			resp.landing.firstPortoflioItemListProjectName,
		);
		setFirstPortoflioItemListProjectUrl(
			resp.landing.firstPortoflioItemListProjectUrl,
		);
		setSecondPortoflioItemListProjectDescription(
			resp.landing.secondPortoflioItemListProjectDescription,
		);
		setSecondPortoflioItemListProjectName(
			resp.landing.secondPortoflioItemListProjectName,
		);
		setSecondPortoflioItemListProjectUrl(
			resp.landing.secondPortoflioItemListProjectUrl,
		);
		setThirdPortoflioItemListProjectDescription(
			resp.landing.thirdPortoflioItemListProjectDescription,
		);
		setThirdPortoflioItemListProjectName(
			resp.landing.thirdPortoflioItemListProjectName,
		);
		setThirdPortoflioItemListProjectUrl(
			resp.landing.thirdPortoflioItemListProjectUrl,
		);
		setTeamHeader(resp.landing.teamHeader);
		setTeamDescription(resp.landing.teamDescription);
		setFirstTeamItemListEmployeeName(
			resp.landing.firstTeamItemListEmployeeName,
		);
		setFirstTeamItemListEmployeePosition(
			resp.landing.firstTeamItemListEmployeePosition,
		);
		setSecondTeamItemListEmployeeName(
			resp.landing.secondTeamItemListEmployeeName,
		);
		setSecondTeamItemListEmployeePosition(
			resp.landing.secondTeamItemListEmployeePosition,
		);
		setThirdTeamItemListEmployeeName(
			resp.landing.thirdTeamItemListEmployeeName,
		);
		setThirdTeamItemListEmployeePosition(
			resp.landing.thirdTeamItemListEmployeePosition,
		);
		setContactHeader(resp.landing.contactHeader);
		setContactDescription(resp.landing.contactDescription);
		setFirstContactItemListName(resp.landing.firstContactItemListName);
		setFirstContactItemListInfo(resp.landing.firstContactItemListInfo);
		setSecondContactItemListName(resp.landing.secondContactItemListName);
		setSecondContactItemListInfo(resp.landing.secondContactItemListInfo);
		setThirdContactItemListName(resp.landing.thirdContactItemListName);
		setThirdContactItemListInfo(resp.landing.thirdContactItemListInfo);
		setFooterDescription(resp.landing.footerDescription);
		changeView();
	};

	if (isConfirmationPage) {
		view = (
			<div>
				<h1 className={styles.h1}>
					Вы точно хотите изменить шаблон сайта лендинга?
				</h1>
				<button className={styles.btnAction} onClick={changeToComponentsPage}>
					Да
				</button>
				<button
					className={styles.btnAction}
					onClick={() => {
						router.push('../../../sites');
					}}
				>
					Нет
				</button>
			</div>
		);
	} else if (isComponentsPage) {
		view = (
			<div>
				<h1 className={styles.h1}>
					Выберите компоненты которые будут использоваться на вашем сайте.
				</h1>
				<ul className={styles.componentsList}>
					<li>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								checked={useHeader}
								onChange={(e) => setUseHeader(e.target.checked)}
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
								checked={useFeatures}
								onChange={(e) => setUseFeatures(e.target.checked)}
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
							Особенности
						</label>
					</li>
					<li>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								checked={useAbout}
								onChange={(e) => setUseAbout(e.target.checked)}
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
								checked={useServices}
								onChange={(e) => setUseServices(e.target.checked)}
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
							Услуги
						</label>
					</li>
					<li>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								checked={usePortfolio}
								onChange={(e) => setUsePortfolio(e.target.checked)}
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
							Портфолио
						</label>
					</li>
					<li>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								checked={useTeam}
								onChange={(e) => setUseTeam(e.target.checked)}
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
							Команда
						</label>
					</li>
					<li>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								checked={useContact}
								onChange={(e) => setUseContact(e.target.checked)}
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
								checked={useFooter}
								onChange={(e) => setUseFooter(e.target.checked)}
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

				<button className={styles.btnAction} onClick={changeToUpdatingPage}>
					Применить
				</button>
			</div>
		);
	} else if (isUpdatingPage) {
		view = (
			<div>
				{templateNameInput}
				{empty}
				{header}
				{features}
				{about}
				{services}
				{portfolio}
				{team}
				{contact}
				{footer}

				<button className={styles.btnAction} onClick={updateSiteInfo}>
					Применить
				</button>
			</div>
		);
	} else if (!isConfirmationPage && !isUpdatingPage && !isComponentsPage) {
		router.push('../../../sites');
	}

	return <Layout auth={auth}>{view}</Layout>;
};

export default LandingEdit;
