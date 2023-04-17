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
			}),
		});
	}
}
