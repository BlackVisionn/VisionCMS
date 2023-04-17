import { LendingDTO } from './dto/lending.dto';

export class LendingAPI {
	public static async getAllForCurrentUser(
		userId: number,
	): Promise<LendingDTO[]> {
		const response = await fetch(
			`http://localhost:5000/lending/sites/${userId}`,
			{
				method: 'GET',
			},
		);
		const data = await response.json();

		return data;
	}

	public static async createLending(
		useHeader: boolean,
		useMainImg: boolean,
		useNavIntroduction: boolean,
		useNavAbout: boolean,
		useNavContact: boolean,
		useFooter: boolean,
		headerName: string,
		headerDescription: string,
		mainImg: string,
		navIntroduction: string,
		introductionTitle: string,
		introductionDescription: string,
		navAbout: string,
		aboutTitle: string,
		aboutDescription: string,
		navContact: string,
		contactTitle: string,
		contactDescription: string,
		footerCompany: string,
		userId: number,
	) {
		await fetch('http://localhost:5000/lending/new', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				useHeader,
				useMainImg,
				useNavIntroduction,
				useNavAbout,
				useNavContact,
				useFooter,
				userId,
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
			}),
		});
	}

	public static async delete(siteID: number) {
		await fetch(`http://localhost:5000/lending/${siteID}`, {
			method: 'DELETE',
		});
	}
}
