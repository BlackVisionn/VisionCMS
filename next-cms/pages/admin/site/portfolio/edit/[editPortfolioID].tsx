import Layout from '@/components/Layout';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserAPI } from '@/api/user.api';
import styles from '../../../../../styles/CreateNewSite.module.css';
import { PortfolioAPI } from '@/api/portfolio.api';

const PortfolioEdit = () => {
	const [auth, setAuth] = useState(false);
	const router = useRouter();
	const siteID = Number(router.query.editPortfolioID);
	const [userId, setUserId] = useState(0);

	//Components using
	const [useHeader, setUseHeader] = useState(false);
	const [useAbout, setUseAbout] = useState(false);
	const [useProjects, setUseProjects] = useState(false);
	const [useWork, setUseWork] = useState(false);
	const [useEducation, setUseEducation] = useState(false);
	const [useLanguages, setUseLanguages] = useState(false);
	const [useContact, setUseContact] = useState(false);
	const [useFooter, setUseFooter] = useState(false);

	//Components
	const [templateName, setTemplateName] = useState<any>();
	const [headerTitle, setHeaderTitle] = useState<any>();
	const [headerDescription, setHeaderDescription] = useState<any>();
	const [headerUrlVk, setHeaderUrlVk] = useState<any>();
	const [headerUrlTelegram, setHeaderUrlTelegram] = useState<any>();
	const [headerUrlGit, setHeaderUrlGit] = useState<any>();
	const [aboutTitle, setAboutTitle] = useState<any>();
	const [aboutFirstParagraph, setAboutFirstParagraph] = useState<any>();
	const [aboutSecondParagraph, setAboutSecondParagraph] = useState<any>();
	const [projectsTitle, setProjectsTitle] = useState<any>();
	const [firstProjectTitle, setFirstProjectTitle] = useState<any>();
	const [firstProjectDate, setFirstProjectDate] = useState<any>();
	const [firstProjectUrl, setFirstProjectUrl] = useState<any>();
	const [secondProjectTitle, setSecondProjectTitle] = useState<any>();
	const [secondProjectDate, setSecondProjectDate] = useState<any>();
	const [secondProjectUrl, setSecondProjectUrl] = useState<any>();
	const [thirdProjectTitle, setThirdProjectTitle] = useState<any>();
	const [thirdProjectDate, setThirdProjectDate] = useState<any>();
	const [thirdProjectUrl, setThirdProjectUrl] = useState<any>();
	const [workTitle, setWorkTitle] = useState<any>();
	const [firstWorkPosition, setFirstWorkPosition] = useState<any>();
	const [firstWorkCompanyName, setFirstWorkCompanyName] = useState<any>();
	const [firstWorkDates, setFirstWorkDates] = useState<any>();
	const [firstWorkDescription, setFirstWorkDescription] = useState<any>();
	const [firstWorkUrl, setFirstWorkUrl] = useState<any>();
	const [secondWorkPosition, setSecondWorkPosition] = useState<any>();
	const [secondWorkCompanyName, setSecondWorkCompanyName] = useState<any>();
	const [secondWorkDates, setSecondWorkDates] = useState<any>();
	const [secondWorkDescription, setSecondWorkDescription] = useState<any>();
	const [secondWorkUrl, setSecondWorkUrl] = useState<any>();
	const [educationTitle, setEducationTitle] = useState<any>();
	const [firstEducationTitle, setFirstEducationTitle] = useState<any>();
	const [firstEducationStudyPlace, setFirstEducationStudyPlace] =
		useState<any>();
	const [firstEducationDates, setFirstEducationDates] = useState<any>();
	const [secondEducationTitle, setSecondEducationTitle] = useState<any>();
	const [secondEducationStudyPlace, setSecondEducationStudyPlace] =
		useState<any>();
	const [secondEducationDates, setSecondEducationDates] = useState<any>();
	const [thirdEducationTitle, setThirdEducationTitle] = useState<any>();
	const [thirdEducationStudyPlace, setThirdEducationStudyPlace] =
		useState<any>();
	const [thirdEducationDates, setThirdEducationDates] = useState<any>();
	const [languagesTitle, setLanguagesTitle] = useState<any>();
	const [firstLanguageName, setFirstLanguageName] = useState<any>();
	const [firstLanguageLevel, setFirstLanguageLevel] = useState<any>();
	const [secondLanguageName, setSecondLanguageName] = useState<any>();
	const [secondLanguageLevel, setSecondLanguageLevel] = useState<any>();
	const [thirdLanguageName, setThirdLanguageName] = useState<any>();
	const [thirdLanguageLevel, setThirdLanguageLevel] = useState<any>();
	const [contactTitle, setContactTitle] = useState<any>();
	const [firstInputPlaceholderName, setFirstInputPlaceholderName] =
		useState<any>();
	const [secondInputPlaceholderName, setSecondInputPlaceholderName] =
		useState<any>();
	const [textareaPlaceholderName, setTextareaPlaceholderName] = useState<any>();
	const [buttonName, setButtonName] = useState<any>();
	const [footerText, setFooterText] = useState<any>();
	const [footerUrlName, setFooterUrlName] = useState<any>();
	const [footerUrl, setFooterUrl] = useState<any>();
	const [footerUrlVk, setFooterUrlVk] = useState<any>();
	const [footerUrlTelegram, setFooterUrlTelegram] = useState<any>();
	const [footerUrlGit, setFooterUrlGit] = useState<any>();

	let view;
	const [isConfirmationPage, setIsConfirmationPage] = useState(true);
	const [isComponentsPage, setIsComponentsPage] = useState(false);
	const [isUpdatingPage, setIsUpdatingPage] = useState(false);

	const [empty, setEmptyContent] = useState<any>();
	const [header, setHeaderContent] = useState<any>();
	const [about, setAboutContent] = useState<any>();
	const [projects, setProjectsContent] = useState<any>();
	const [work, setWorkContent] = useState<any>();
	const [education, setEducationContent] = useState<any>();
	const [languages, setLanguagesContent] = useState<any>();
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
			!useAbout &&
			!useProjects &&
			!useWork &&
			!useEducation &&
			!useLanguages &&
			!useContact &&
			!useFooter
		) {
			content = (
				<div>
					<h1 className={styles.h1}>
						Ваш сайт не содержит компонентов и будет пустым
					</h1>
				</div>
			);
			setEmptyContent(content);
		} else {
			content = <div></div>;
			setEmptyContent(content);
		}

		if (useHeader) {
			content = (
				<div>
					<h1 className={styles.h1}>
						Введите свой заголовок сайта, краткое описание и ссылки для связи с
						вами.
					</h1>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Заголовок сайта.</label>
						<input
							type="text"
							placeholder={headerTitle}
							className={styles.input}
							onChange={(e) => setHeaderTitle(e.target.value)}
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
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Ссылка на ВКонтакте (https://vk.com/).
						</label>
						<input
							type="text"
							placeholder={headerUrlVk}
							className={styles.input}
							onChange={(e) => setHeaderUrlVk(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Ссылка на Telegram (https://t.me/).
						</label>
						<input
							type="text"
							placeholder={headerUrlTelegram}
							className={styles.input}
							onChange={(e) => setHeaderUrlTelegram(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Ссылка на GitHub (https://github.com/).
						</label>
						<input
							type="text"
							placeholder={headerUrlGit}
							className={styles.input}
							onChange={(e) => setHeaderUrlGit(e.target.value)}
						/>
					</div>
				</div>
			);
			setHeaderContent(content);
		} else {
			content = <div></div>;
			setHeaderContent(content);
		}

		if (useAbout) {
			content = (
				<div>
					<h1 className={styles.h1}>Введите информацию "О себе".</h1>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Заголовок раздела "О себе".</label>
						<input
							type="text"
							placeholder={aboutTitle}
							className={styles.input}
							onChange={(e) => setAboutTitle(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Содержание первого параграфа "О себе".
						</label>
						<input
							type="text"
							placeholder={aboutFirstParagraph}
							className={styles.input}
							onChange={(e) => setAboutFirstParagraph(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Содержание второго параграфа "О себе".
						</label>
						<input
							type="text"
							placeholder={aboutSecondParagraph}
							className={styles.input}
							onChange={(e) => setAboutSecondParagraph(e.target.value)}
						/>
					</div>
				</div>
			);
			setAboutContent(content);
		} else {
			content = <div></div>;
			setAboutContent(content);
		}

		if (useProjects) {
			content = (
				<div>
					<h1 className={styles.h1}>
						Введите информацию о ваших трех проектах.
					</h1>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Заголовок раздела "Проекты".</label>
						<input
							type="text"
							placeholder={projectsTitle}
							className={styles.input}
							onChange={(e) => setProjectsTitle(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Название первого проекта.</label>
						<input
							type="text"
							placeholder={firstProjectTitle}
							className={styles.input}
							onChange={(e) => setFirstProjectTitle(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Дата создания первого проекта.
						</label>
						<input
							type="text"
							placeholder={firstProjectDate}
							className={styles.input}
							onChange={(e) => setFirstProjectDate(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Ссылка на первый проект.</label>
						<input
							type="text"
							placeholder={firstProjectUrl}
							className={styles.input}
							onChange={(e) => setFirstProjectUrl(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Название второго проекта.</label>
						<input
							type="text"
							placeholder={secondProjectTitle}
							className={styles.input}
							onChange={(e) => setSecondProjectTitle(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Дата создания второго проекта.
						</label>
						<input
							type="text"
							placeholder={secondProjectDate}
							className={styles.input}
							onChange={(e) => setSecondProjectDate(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Ссылка на второй проект.</label>
						<input
							type="text"
							placeholder={secondProjectUrl}
							className={styles.input}
							onChange={(e) => setSecondProjectUrl(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Название третьего проекта.</label>
						<input
							type="text"
							placeholder={thirdProjectTitle}
							className={styles.input}
							onChange={(e) => setThirdProjectTitle(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Дата создания третьего проекта.
						</label>
						<input
							type="text"
							placeholder={thirdProjectDate}
							className={styles.input}
							onChange={(e) => setThirdProjectDate(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Ссылка на третий проект.</label>
						<input
							type="text"
							placeholder={thirdProjectUrl}
							className={styles.input}
							onChange={(e) => setThirdProjectUrl(e.target.value)}
						/>
					</div>
				</div>
			);
			setProjectsContent(content);
		} else {
			content = <div></div>;
			setProjectsContent(content);
		}

		if (useWork) {
			content = (
				<div>
					<h1 className={styles.h1}>
						Введите два места работы, где приходилось работать, с должность и
						кратким описанием, чем занимались на данном месте работы.
					</h1>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Заголовок раздела "Опыт работы".
						</label>
						<input
							type="text"
							placeholder={workTitle}
							className={styles.input}
							onChange={(e) => setWorkTitle(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Должность в первой компании.</label>
						<input
							type="text"
							placeholder={firstWorkPosition}
							className={styles.input}
							onChange={(e) => setFirstWorkPosition(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Название первой компании.</label>
						<input
							type="text"
							placeholder={firstWorkCompanyName}
							className={styles.input}
							onChange={(e) => setFirstWorkCompanyName(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Период работы в первой компании (Пример 2015-2017).
						</label>
						<input
							type="text"
							placeholder={firstWorkDates}
							className={styles.input}
							onChange={(e) => setFirstWorkDates(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Краткое описание чем занимались в первой компании.
						</label>
						<input
							type="text"
							placeholder={firstWorkDescription}
							className={styles.input}
							onChange={(e) => setFirstWorkDescription(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Ссылка на сайт первой компании.
						</label>
						<input
							type="text"
							placeholder={firstWorkUrl}
							className={styles.input}
							onChange={(e) => setFirstWorkUrl(e.target.value)}
						/>
					</div>

					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Должность во второй компании.
						</label>
						<input
							type="text"
							placeholder={secondWorkPosition}
							className={styles.input}
							onChange={(e) => setSecondWorkPosition(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Название второй компании.</label>
						<input
							type="text"
							placeholder={secondWorkCompanyName}
							className={styles.input}
							onChange={(e) => setSecondWorkCompanyName(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Период работы во второй компании (Пример 2015-2017).
						</label>
						<input
							type="text"
							placeholder={secondWorkDates}
							className={styles.input}
							onChange={(e) => setSecondWorkDates(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Краткое описание чем занимались во второй компании.
						</label>
						<input
							type="text"
							placeholder={secondWorkDescription}
							className={styles.input}
							onChange={(e) => setSecondWorkDescription(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Ссылка на сайт второй компании.
						</label>
						<input
							type="text"
							placeholder={secondWorkUrl}
							className={styles.input}
							onChange={(e) => setSecondWorkUrl(e.target.value)}
						/>
					</div>
				</div>
			);
			setWorkContent(content);
		} else {
			content = <div></div>;
			setWorkContent(content);
		}

		if (useEducation) {
			content = (
				<div>
					<h1 className={styles.h1}>Введите информацию о своем образовании.</h1>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Заголовок раздела "Образование".
						</label>
						<input
							type="text"
							placeholder={educationTitle}
							className={styles.input}
							onChange={(e) => setEducationTitle(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Наименование вашего первого образования.
						</label>
						<input
							type="text"
							placeholder={firstEducationTitle}
							className={styles.input}
							onChange={(e) => setFirstEducationTitle(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Наименование учреждения в котором было получено первое
							образование.
						</label>
						<input
							type="text"
							placeholder={firstEducationStudyPlace}
							className={styles.input}
							onChange={(e) => setFirstEducationStudyPlace(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Даты обучения в учреждении, где было получено первое образование
							(Пример 2015-2017).
						</label>
						<input
							type="text"
							placeholder={firstEducationDates}
							className={styles.input}
							onChange={(e) => setFirstEducationDates(e.target.value)}
						/>
					</div>

					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Наименование вашего второго образования.
						</label>
						<input
							type="text"
							placeholder={secondEducationTitle}
							className={styles.input}
							onChange={(e) => setSecondEducationTitle(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Наименование учреждения в котором было получено второе
							образование.
						</label>
						<input
							type="text"
							placeholder={secondEducationStudyPlace}
							className={styles.input}
							onChange={(e) => setSecondEducationStudyPlace(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Даты обучения в учреждении, где было получено второе образование
							(Пример 2015-2017).
						</label>
						<input
							type="text"
							placeholder={secondEducationDates}
							className={styles.input}
							onChange={(e) => setSecondEducationDates(e.target.value)}
						/>
					</div>

					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Наименование вашего третьего образования.
						</label>
						<input
							type="text"
							placeholder={thirdEducationTitle}
							className={styles.input}
							onChange={(e) => setThirdEducationTitle(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Наименование учреждения в котором было получено третье
							образование.
						</label>
						<input
							type="text"
							placeholder={thirdEducationStudyPlace}
							className={styles.input}
							onChange={(e) => setThirdEducationStudyPlace(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Даты обучения в учреждении, где было получено третье образование
							(Пример 2015-2017).
						</label>
						<input
							type="text"
							placeholder={thirdEducationDates}
							className={styles.input}
							onChange={(e) => setThirdEducationDates(e.target.value)}
						/>
					</div>
				</div>
			);
			setEducationContent(content);
		} else {
			content = <div></div>;
			setEducationContent(content);
		}
		if (useLanguages) {
			content = (
				<div>
					<h1 className={styles.h1}>
						Введите информацию о трех языках которыми владеете.
					</h1>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Заголовок раздела "Языки".</label>
						<input
							type="text"
							placeholder={languagesTitle}
							className={styles.input}
							onChange={(e) => setLanguagesTitle(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>Название первого языка.</label>
						<input
							type="text"
							placeholder={firstLanguageName}
							className={styles.input}
							onChange={(e) => setFirstLanguageName(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Уровень владения первым языком.
						</label>
						<input
							type="text"
							placeholder={firstLanguageLevel}
							className={styles.input}
							onChange={(e) => setFirstLanguageLevel(e.target.value)}
						/>
					</div>

					<div className={styles.inputWrapper}>
						<label className={styles.label}>Название второго языка.</label>
						<input
							type="text"
							placeholder={secondLanguageName}
							className={styles.input}
							onChange={(e) => setSecondLanguageName(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Уровень владения вторым языком.
						</label>
						<input
							type="text"
							placeholder={secondLanguageLevel}
							className={styles.input}
							onChange={(e) => setSecondLanguageLevel(e.target.value)}
						/>
					</div>

					<div className={styles.inputWrapper}>
						<label className={styles.label}>Название третьего языка.</label>
						<input
							type="text"
							placeholder={thirdLanguageName}
							className={styles.input}
							onChange={(e) => setThirdLanguageName(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Уровень владения третьим языком.
						</label>
						<input
							type="text"
							placeholder={thirdLanguageLevel}
							className={styles.input}
							onChange={(e) => setThirdLanguageLevel(e.target.value)}
						/>
					</div>
				</div>
			);
			setLanguagesContent(content);
		} else {
			content = <div></div>;
			setLanguagesContent(content);
		}
		if (useContact) {
			content = (
				<div>
					<h1 className={styles.h1}>
						Введите название полей ввода и кнопки для раздела "Связаться".
					</h1>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Заголовок раздела "Связаться".
						</label>
						<input
							type="text"
							placeholder={contactTitle}
							className={styles.input}
							onChange={(e) => setContactTitle(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Название первого поля ввода "Эл. почта".
						</label>
						<input
							type="text"
							placeholder={firstInputPlaceholderName}
							className={styles.input}
							onChange={(e) => setFirstInputPlaceholderName(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Название второго поля ввода "Тема сообщения".
						</label>
						<input
							type="text"
							placeholder={secondInputPlaceholderName}
							className={styles.input}
							onChange={(e) => setSecondInputPlaceholderName(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Название третьего поля ввода "Сообщение".
						</label>
						<input
							type="text"
							placeholder={textareaPlaceholderName}
							className={styles.input}
							onChange={(e) => setTextareaPlaceholderName(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Название кнопки "Отправить сообщение".
						</label>
						<input
							type="text"
							placeholder={buttonName}
							className={styles.input}
							onChange={(e) => setButtonName(e.target.value)}
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
					<h1 className={styles.h1}>Введите информацию для подвала сайта.</h1>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Ваш текст о том кто создал сайт (Пример: ©All right reserved.
							Design).
						</label>
						<input
							type="text"
							placeholder={footerText}
							className={styles.input}
							onChange={(e) => setFooterText(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Название компании или имя кто создал сайт.
						</label>
						<input
							type="text"
							placeholder={footerUrlName}
							className={styles.input}
							onChange={(e) => setFooterUrlName(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Ссылка на того кто создал сайт.
						</label>
						<input
							type="text"
							placeholder={footerUrl}
							className={styles.input}
							onChange={(e) => setFooterUrl(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Ссылка на ВКонтакте (https://vk.com/).
						</label>
						<input
							type="text"
							placeholder={footerUrlVk}
							className={styles.input}
							onChange={(e) => setFooterUrlVk(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Ссылка на Telegram (https://t.me/).
						</label>
						<input
							type="text"
							placeholder={footerUrlTelegram}
							className={styles.input}
							onChange={(e) => setFooterUrlTelegram(e.target.value)}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<label className={styles.label}>
							Ссылка на GitHub (https://github.com/).
						</label>
						<input
							type="text"
							placeholder={footerUrlGit}
							className={styles.input}
							onChange={(e) => setFooterUrlGit(e.target.value)}
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
		PortfolioAPI.updatePortfolio(
			siteID,
			templateName,
			headerTitle,
			headerDescription,
			headerUrlVk,
			headerUrlTelegram,
			headerUrlGit,
			aboutTitle,
			aboutFirstParagraph,
			aboutSecondParagraph,
			projectsTitle,
			firstProjectTitle,
			firstProjectDate,
			firstProjectUrl,
			secondProjectTitle,
			secondProjectDate,
			secondProjectUrl,
			thirdProjectTitle,
			thirdProjectDate,
			thirdProjectUrl,
			workTitle,
			firstWorkPosition,
			firstWorkCompanyName,
			firstWorkDates,
			firstWorkDescription,
			firstWorkUrl,
			secondWorkPosition,
			secondWorkCompanyName,
			secondWorkDates,
			secondWorkDescription,
			secondWorkUrl,
			educationTitle,
			firstEducationTitle,
			firstEducationStudyPlace,
			firstEducationDates,
			secondEducationTitle,
			secondEducationStudyPlace,
			secondEducationDates,
			thirdEducationTitle,
			thirdEducationStudyPlace,
			thirdEducationDates,
			languagesTitle,
			firstLanguageName,
			firstLanguageLevel,
			secondLanguageName,
			secondLanguageLevel,
			thirdLanguageName,
			thirdLanguageLevel,
			contactTitle,
			firstInputPlaceholderName,
			secondInputPlaceholderName,
			textareaPlaceholderName,
			buttonName,
			footerText,
			footerUrlName,
			footerUrl,
			footerUrlVk,
			footerUrlTelegram,
			footerUrlGit,
		);
		changeView();
	};

	const changeToUpdatingPage = async (e: SyntheticEvent) => {
		e.preventDefault();
		const resp = await PortfolioAPI.getPortoflioData(siteID);
		PortfolioAPI.updatePortfolioComponents(
			resp.id,
			useHeader,
			useAbout,
			useProjects,
			useWork,
			useEducation,
			useLanguages,
			useContact,
			useFooter,
		);
		setComponents();
		changeView();
	};

	const changeToComponentsPage = async (e: SyntheticEvent) => {
		e.preventDefault();
		const resp = await PortfolioAPI.getPortoflioData(siteID);
		setUseHeader(resp.useHeader);
		setUseAbout(resp.useAbout);
		setUseProjects(resp.useProjects);
		setUseWork(resp.useWork);
		setUseEducation(resp.useEducation);
		setUseLanguages(resp.useLanguages);
		setUseContact(resp.useContact);
		setUseFooter(resp.useFooter);

		setTemplateName(resp.portfolio.templateName);
		setHeaderTitle(resp.portfolio.headerTitle);
		setHeaderDescription(resp.portfolio.headerDescription);
		setHeaderUrlVk(resp.portfolio.headerUrlVk);
		setHeaderUrlTelegram(resp.portfolio.headerUrlTelegram);
		setHeaderUrlGit(resp.portfolio.headerUrlGit);
		setAboutTitle(resp.portfolio.aboutTitle);
		setAboutFirstParagraph(resp.portfolio.aboutFirstParagraph);
		setAboutSecondParagraph(resp.portfolio.aboutSecondParagraph);
		setProjectsTitle(resp.portfolio.projectsTitle);
		setFirstProjectTitle(resp.portfolio.firstProjectTitle);
		setFirstProjectDate(resp.portfolio.firstProjectDate);
		setFirstProjectUrl(resp.portfolio.firstProjectUrl);
		setSecondProjectTitle(resp.portfolio.secondProjectTitle);
		setSecondProjectDate(resp.portfolio.secondProjectDate);
		setSecondProjectUrl(resp.portfolio.secondProjectUrl);
		setThirdProjectTitle(resp.portfolio.thirdProjectTitle);
		setThirdProjectDate(resp.portfolio.thirdProjectDate);
		setThirdProjectUrl(resp.portfolio.thirdProjectUrl);
		setWorkTitle(resp.portfolio.workTitle);
		setFirstWorkPosition(resp.portfolio.firstWorkPosition);
		setFirstWorkCompanyName(resp.portfolio.firstWorkCompanyName);
		setFirstWorkDates(resp.portfolio.firstWorkDates);
		setFirstWorkDescription(resp.portfolio.firstWorkDescription);
		setFirstWorkUrl(resp.portfolio.firstWorkUrl);
		setSecondWorkPosition(resp.portfolio.secondWorkPosition);
		setSecondWorkCompanyName(resp.portfolio.secondWorkCompanyName);
		setSecondWorkDates(resp.portfolio.secondWorkDates);
		setSecondWorkDescription(resp.portfolio.secondWorkDescription);
		setSecondWorkUrl(resp.portfolio.secondWorkUrl);
		setEducationTitle(resp.portfolio.educationTitle);
		setFirstEducationTitle(resp.portfolio.firstEducationTitle);
		setFirstEducationStudyPlace(resp.portfolio.firstEducationStudyPlace);
		setFirstEducationDates(resp.portfolio.firstEducationDates);
		setSecondEducationTitle(resp.portfolio.secondEducationTitle);
		setSecondEducationStudyPlace(resp.portfolio.secondEducationStudyPlace);
		setSecondEducationDates(resp.portfolio.secondEducationDates);
		setThirdEducationTitle(resp.portfolio.thirdEducationTitle);
		setThirdEducationStudyPlace(resp.portfolio.thirdEducationStudyPlace);
		setThirdEducationDates(resp.portfolio.thirdEducationDates);
		setLanguagesTitle(resp.portfolio.languagesTitle);
		setFirstLanguageName(resp.portfolio.firstLanguageName);
		setFirstLanguageLevel(resp.portfolio.firstLanguageLevel);
		setSecondLanguageName(resp.portfolio.secondLanguageName);
		setSecondLanguageLevel(resp.portfolio.secondLanguageLevel);
		setThirdLanguageName(resp.portfolio.thirdLanguageName);
		setThirdLanguageLevel(resp.portfolio.thirdLanguageLevel);
		setContactTitle(resp.portfolio.contactTitle);
		setFirstInputPlaceholderName(resp.portfolio.firstInputPlaceholderName);
		setSecondInputPlaceholderName(resp.portfolio.secondInputPlaceholderName);
		setTextareaPlaceholderName(resp.portfolio.textareaPlaceholderName);
		setButtonName(resp.portfolio.buttonName);
		setFooterText(resp.portfolio.footerText);
		setFooterUrlName(resp.portfolio.footerUrlName);
		setFooterUrl(resp.portfolio.footerUrl);
		setFooterUrlVk(resp.portfolio.footerUrlVk);
		setFooterUrlTelegram(resp.portfolio.footerUrlTelegram);
		setFooterUrlGit(resp.portfolio.footerUrlGit);

		changeView();
	};

	if (isConfirmationPage) {
		view = (
			<div>
				<h1 className={styles.h1}>Вы точно хотите изменить шаблон сайта портфолио?</h1>
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
					Выберите компоненты которые будут использоваться на вашем сайте
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
							О Себе
						</label>
					</li>
					<li>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								checked={useProjects}
								onChange={(e) => setUseProjects(e.target.checked)}
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
							Проекты
						</label>
					</li>
					<li>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								checked={useWork}
								onChange={(e) => setUseWork(e.target.checked)}
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
							Опыт работы
						</label>
					</li>
					<li>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								checked={useEducation}
								onChange={(e) => setUseEducation(e.target.checked)}
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
							Образование
						</label>
					</li>
					<li>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								checked={useLanguages}
								onChange={(e) => setUseLanguages(e.target.checked)}
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
							Языки
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
				{about}
				{projects}
				{work}
				{education}
				{languages}
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

export default PortfolioEdit;
