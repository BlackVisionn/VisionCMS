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
}
