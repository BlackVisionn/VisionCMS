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

	public static async createLandingComponents() { // todo
		await fetch('http://localhost:5000/landing-components/new', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				// todo
			}),
		});
	}
	public static async createLanding() { // todo
		await fetch('http://localhost:5000/landing/new', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				// todo
			}),
		});
	}

	public static async updateLanding(
		siteID: number,
		// todo
	) {
		await fetch(`http://localhost:5000/portfolio/${siteID}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				// todo
			}),
		});
	}
}
