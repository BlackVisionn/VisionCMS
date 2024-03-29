import { PortfolioDTO } from './dto/portfolio.dto';

export class PortfolioAPI {
	public static async getAllForCurrentUser(
		userId: number,
	): Promise<PortfolioDTO[]> {
		const response = await fetch(
			`http://localhost:5000/portfolio/sites/${userId}`,
			{
				method: 'GET',
			},
		);
		const data = await response.json();

		return data;
	}

	public static async deleteFromServer(portfolioId: number) {
		await fetch(
			`http://localhost:5000/portfolio-components/delete-template/${portfolioId}`,
			{
				method: 'GET',
			},
		);
	}

	public static async getPortoflioData(portfolioId: number) {
		const response = await fetch(
			`http://localhost:5000/portfolio-components/portfolio-data/${portfolioId}`,
			{
				method: 'GET',
			},
		);
		const data = await response.json();

		return data;
	}

	public static async updatePortfolioComponents(
		id: number,
		useHeader: boolean,
		useAbout: boolean,
		useProjects: boolean,
		useWork: boolean,
		useEducation: boolean,
		useLanguages: boolean,
		useContact: boolean,
		useFooter: boolean,
	) {
		await fetch(`http://localhost:5000/portfolio-components/${id}`, {
			method: 'PATCH',
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
			}),
		});
	}

	public static async getComponentsForPortfolioByPortfolioId(
		portfolioId: number,
	) {
		const response = await fetch(
			`http://localhost:5000/portfolio-components/${portfolioId}`,
			{
				method: 'GET',
			},
		);
		const data = await response.json();

		return data;
	}

	public static async delete(siteID: number) {
		await fetch(`http://localhost:5000/portfolio/${siteID}`, {
			method: 'DELETE',
		});
	}

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
		portfolioId: number,
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
				portfolioId,
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

	public static async updatePortfolio(
		siteID: number,
		templateName: string,
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
	) {
		await fetch(`http://localhost:5000/portfolio/${siteID}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
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
			}),
		});
	}
}
