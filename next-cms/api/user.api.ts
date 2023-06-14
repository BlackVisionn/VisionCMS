import { UserDTO } from './dto/user.dto';

export class UserAPI {
	public static async getUser() {
		const response = await fetch('http://localhost:5000/auth/user', {
			method: 'GET',
			credentials: 'include',
		});
		const data = await response.json();

		return data;
	}

	public static async registerUser(
		name: string,
		email: string,
		password: string,
	) {
		await fetch('http://localhost:5000/auth/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		});
	}

	public static async loginUser(email: string, password: string) {
		await fetch('http://localhost:5000/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({
				email,
				password,
			}),
		});
	}
	public static async logoutUser() {
		await fetch('http://localhost:5000/auth/logout', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		});
	}
}
