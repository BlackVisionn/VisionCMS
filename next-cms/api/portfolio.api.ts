import { LendingDTO } from './dto/lending.dto';

export class PortfolioAPI {
	public static async getLastCreatedPortfolio(userId: number) {
		const response = await fetch(
			`http://localhost:5000/portfolio/last-portfolio/${userId}`,
			{
				method: 'GET',
			},
		);
		const data = await response.json();

		return data;
	}

	public static async createPortfolioComponents(
		useHeader: boolean,
		useAbout: boolean,
		useProjects: boolean,
		useWork: boolean,
		useEducation: boolean,
		useLanguages: boolean,
		useContact: boolean,
		useFooter: boolean,
		portfolio: number,
	) {
		await fetch('http://localhost:5000/portfolio-components/new', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				useHeader,
				useAbout,
				useProjects,
				useWork,
				useEducation,
				useLanguages,
				useContact,
				useFooter,
				portfolio,
			}),
		});
	}
	public static async createPortfolio(
		headerTitle: string,
		headerDescription: string,
		headerUrlVk: string,
		headerUrlTelegram: string,
		headerUrlGit: string,
		aboutTitle: string,
		aboutFirstParagraph: string,
		aboutSecondParagraph: string,
		projectsTitle: string,
		firstProjectTitle: string,
		firstProjectDate: string,
		firstProjectUrl: string,
		secondProjectTitle: string,
		secondProjectDate: string,
		secondProjectUrl: string,
		thirdProjectTitle: string,
		thirdProjectDate: string,
		thirdProjectUrl: string,
		workTitle: string,
		firstWorkPosition: string,
		firstWorkCompanyName: string,
		firstWorkDates: string,
		firstWorkDescription: string,
		firstWorkUrl: string,
		secondWorkPosition: string,
		secondWorkCompanyName: string,
		secondWorkDates: string,
		secondWorkDescription: string,
		secondWorkUrl: string,
		educationTitle: string,
		firstEducationTitle: string,
		firstEducationStudyPlace: string,
		firstEducationDates: string,
		secondEducationTitle: string,
		secondEducationStudyPlace: string,
		secondEducationDates: string,
		thirdEducationTitle: string,
		thirdEducationStudyPlace: string,
		thirdEducationDates: string,
		languagesTitle: string,
		firstLanguageName: string,
		firstLanguageLevel: string,
		secondLanguageName: string,
		secondLanguageLevel: string,
		thirdLanguageName: string,
		thirdLanguageLevel: string,
		contactTitle: string,
		firstInputPlaceholderName: string,
		secondInputPlaceholderName: string,
		textareaPlaceholderName: string,
		buttonName: string,
		footerText: string,
		footerUrlName: string,
		footerUrl: string,
		footerUrlVk: string,
		footerUrlTelegram: string,
		footerUrlGit: string,
		userId: number,
	) {
		await fetch('http://localhost:5000/portfolio/new', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
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
				userId,
			}),
		});
	}

	// public static async createLending(
	// 	useHeader: boolean,
	// 	useMainImg: boolean,
	// 	useNavIntroduction: boolean,
	// 	useNavAbout: boolean,
	// 	useNavContact: boolean,
	// 	useFooter: boolean,
	// 	headerName: string,
	// 	headerDescription: string,
	// 	mainImg: string,
	// 	navIntroduction: string,
	// 	introductionTitle: string,
	// 	introductionDescription: string,
	// 	navAbout: string,
	// 	aboutTitle: string,
	// 	aboutDescription: string,
	// 	navContact: string,
	// 	contactTitle: string,
	// 	contactDescription: string,
	// 	footerCompany: string,
	// 	userId: number,
	// ) {
	// 	await fetch('http://localhost:5000/lending/new', {
	// 		method: 'POST',
	// 		headers: { 'Content-Type': 'application/json' },
	// 		body: JSON.stringify({
	// 			useHeader,
	// 			useMainImg,
	// 			useNavIntroduction,
	// 			useNavAbout,
	// 			useNavContact,
	// 			useFooter,
	// 			userId,
	// 			headerName,
	// 			headerDescription,
	// 			mainImg,
	// 			navIntroduction,
	// 			introductionTitle,
	// 			introductionDescription,
	// 			navAbout,
	// 			aboutTitle,
	// 			aboutDescription,
	// 			navContact,
	// 			contactTitle,
	// 			contactDescription,
	// 			footerCompany,
	// 		}),
	// 	});
	// }

	// public static async delete(siteID: number) {
	// 	await fetch(`http://localhost:5000/lending/${siteID}`, {
	// 		method: 'DELETE',
	// 	});
	// }

	// public static async updateLending(
	// 	siteID: number,
	// 	headerName: string,
	// 	headerDescription: string,
	// 	mainImg: string,
	// 	navIntroduction: string,
	// 	introductionTitle: string,
	// 	introductionDescription: string,
	// 	navAbout: string,
	// 	aboutTitle: string,
	// 	aboutDescription: string,
	// 	navContact: string,
	// 	contactTitle: string,
	// 	contactDescription: string,
	// 	footerCompany: string,
	// ) {
	// 	await fetch(`http://localhost:5000/lending/${siteID}`, {
	// 		method: 'PATCH',
	// 		headers: { 'Content-Type': 'application/json' },
	// 		body: JSON.stringify({
	// 			headerName,
	// 			headerDescription,
	// 			mainImg,
	// 			navIntroduction,
	// 			introductionTitle,
	// 			introductionDescription,
	// 			navAbout,
	// 			aboutTitle,
	// 			aboutDescription,
	// 			navContact,
	// 			contactTitle,
	// 			contactDescription,
	// 			footerCompany,
	// 		}),
	// 	});
	// }
}