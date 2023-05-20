import { UserAPI } from '@/api/user.api';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import styles from '../../../../styles/CreateNewSite.module.css';
import { PortfolioAPI } from '@/api/portfolio.api';

const PortfolioComponents = () => {
	const [auth, setAuth] = useState(false);
	const [userID, setUserID] = useState(0);

	//Components using
	const [useHeader, setUseHeader] = useState(false);
	const [useAbout, setUseAbout] = useState(false);
	const [useProjects, setUseProjects] = useState(false);
	const [useWork, setUseWork] = useState(false);
	const [useEducation, setUseEducation] = useState(false);
	const [useLanguages, setUseLanguages] = useState(false);
	const [useContact, setUseContact] = useState(false);
	const [useFooter, setUseFooter] = useState(false);
	const [portfolio, setPortfolioID] = useState(10);

	//Components
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

	const router = useRouter();

	useEffect(() => {
		(async () => {
			const resp = await UserAPI.getUser();

			if (resp.name == undefined) {
				setAuth(false);
				await router.push('/login');
			} else {
				setAuth(true);
				setUserID(resp.id);
			}
		})();
	});

	const createPortfolioUsingComponents = async (e: SyntheticEvent) => {
		e.preventDefault();
		await PortfolioAPI.createPortfolioComponents(
			useHeader,
			useAbout,
			useProjects,
			useWork,
			useEducation,
			useLanguages,
			useContact,
			useFooter,
			portfolio,
		);
		await PortfolioAPI.createPortfolio(
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
			userID,
		);
	};

	let view = (
		<div>
			<h1 className={styles.h1}>
				Выберите компоненты которые будут использоваться на вашем сайте
			</h1>
			<ul className={styles.componentsList}>
				<li>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
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

			<button
				className={styles.btnAction}
				onClick={createPortfolioUsingComponents}
			>
				Применить
			</button>
			{/* onClick={setComponents} */}
		</div>
	);

	return <Layout auth={auth}>{view}</Layout>;
};

export default PortfolioComponents;
