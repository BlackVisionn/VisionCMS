import { LandingDTO } from './dto/landing.dto';

export class LandingAPI {
	public static async getAllForCurrentUser(
		userId: number,
	): Promise<LandingDTO[]> {
		const response = await fetch(
			`http://localhost:5000/landing/sites/${userId}`,
			{
				method: 'GET',
			},
		);
		const data = await response.json();

		return data;
	}

	public static async getComponentsForLandingByLandingId(landingId: number) {
		const response = await fetch(
			`http://localhost:5000/landing-components/${landingId}`,
			{
				method: 'GET',
			},
		);
		const data = await response.json();

		return data;
	}

	public static async getLandingData(landingId: number) {
		const response = await fetch(
			`http://localhost:5000/landing-components/landing-data/${landingId}`,
			{
				method: 'GET',
			},
		);
		const data = await response.json();

		return data;
	}

	public static async delete(siteID: number) {
		await fetch(`http://localhost:5000/landing/${siteID}`, {
			method: 'DELETE',
		});
	}

	public static async getLastCreatedLanding(userId: number) {
		const response = await fetch(
			`http://localhost:5000/landing/last-landing/${userId}`,
			{
				method: 'GET',
			},
		);
		const data = await response.json();

		return data;
	}

	public static async createLandingComponents(
		useHeader: boolean,
		useFeatures: boolean,
		useAbout: boolean,
		useServices: boolean,
		usePortfolio: boolean,
		useTeam: boolean,
		useContact: boolean,
		useFooter: boolean,
		landingId: number,
	) {
		await fetch('http://localhost:5000/landing-components/new', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				useHeader,
				useFeatures,
				useAbout,
				useServices,
				usePortfolio,
				useTeam,
				useContact,
				useFooter,
				landingId,
			}),
		});
	}
	public static async createLanding(
		headerName: string,
		headerDescription: string,
		buttonName: string,
		featuresNavItemName: string,
		aboutNavItemName: string,
		servicesNavItemName: string,
		portfolioNavItemName: string,
		teamNavItemName: string,
		contactNavItemName: string,
		featuresHeader: string,
		firstFeaturesItemList: string,
		secondFeaturesItemList: string,
		thirdFeaturesItemList: string,
		aboutHeader: string,
		aboutDescription: string,
		servicesHeader: string,
		firstServicesItemList: string,
		secondServicesItemList: string,
		thirdServicesItemList: string,
		portfolioHeader: string,
		portfolioDescription: string,
		firstPortoflioItemListProjectDescription: string,
		firstPortoflioItemListProjectName: string,
		firstPortoflioItemListProjectUrl: string,
		secondPortoflioItemListProjectDescription: string,
		secondPortoflioItemListProjectName: string,
		secondPortoflioItemListProjectUrl: string,
		thirdPortoflioItemListProjectDescription: string,
		thirdPortoflioItemListProjectName: string,
		thirdPortoflioItemListProjectUrl: string,
		teamHeader: string,
		teamDescription: string,
		firstTeamItemListEmployeeName: string,
		firstTeamItemListEmployeePosition: string,
		secondTeamItemListEmployeeName: string,
		secondTeamItemListEmployeePosition: string,
		thirdTeamItemListEmployeeName: string,
		thirdTeamItemListEmployeePosition: string,
		contactHeader: string,
		contactDescription: string,
		firstContactItemListName: string,
		firstContactItemListInfo: string,
		secondContactItemListName: string,
		secondContactItemListInfo: string,
		thirdContactItemListName: string,
		thirdContactItemListInfo: string,
		footerDescription: string,
		userId: number,
	) {
		await fetch('http://localhost:5000/landing/new', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
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
				userId,
			}),
		});
	}

	public static async updateLandingComponents(
		id: number,
		useHeader: boolean,
		useFeatures: boolean,
		useAbout: boolean,
		useServices: boolean,
		usePortfolio: boolean,
		useTeam: boolean,
		useContact: boolean,
		useFooter: boolean,
	) {
		await fetch(`http://localhost:5000/landing-components/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				useHeader,
				useFeatures,
				useAbout,
				useServices,
				usePortfolio,
				useTeam,
				useContact,
				useFooter,
			}),
		});
	}

	public static async updateLanding(
		siteID: number,
		templateName: string,
		headerName: string,
		headerDescription: string,
		buttonName: string,
		featuresNavItemName: string,
		aboutNavItemName: string,
		servicesNavItemName: string,
		portfolioNavItemName: string,
		teamNavItemName: string,
		contactNavItemName: string,
		featuresHeader: string,
		firstFeaturesItemList: string,
		secondFeaturesItemList: string,
		thirdFeaturesItemList: string,
		aboutHeader: string,
		aboutDescription: string,
		servicesHeader: string,
		firstServicesItemList: string,
		secondServicesItemList: string,
		thirdServicesItemList: string,
		portfolioHeader: string,
		portfolioDescription: string,
		firstPortoflioItemListProjectDescription: string,
		firstPortoflioItemListProjectName: string,
		firstPortoflioItemListProjectUrl: string,
		secondPortoflioItemListProjectDescription: string,
		secondPortoflioItemListProjectName: string,
		secondPortoflioItemListProjectUrl: string,
		thirdPortoflioItemListProjectDescription: string,
		thirdPortoflioItemListProjectName: string,
		thirdPortoflioItemListProjectUrl: string,
		teamHeader: string,
		teamDescription: string,
		firstTeamItemListEmployeeName: string,
		firstTeamItemListEmployeePosition: string,
		secondTeamItemListEmployeeName: string,
		secondTeamItemListEmployeePosition: string,
		thirdTeamItemListEmployeeName: string,
		thirdTeamItemListEmployeePosition: string,
		contactHeader: string,
		contactDescription: string,
		firstContactItemListName: string,
		firstContactItemListInfo: string,
		secondContactItemListName: string,
		secondContactItemListInfo: string,
		thirdContactItemListName: string,
		thirdContactItemListInfo: string,
		footerDescription: string,
	) {
		await fetch(`http://localhost:5000/landing/${siteID}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
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
			}),
		});
	}
}
