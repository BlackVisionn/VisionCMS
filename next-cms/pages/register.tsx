import Layout from '@/layouts/Layout';
import { useRouter } from 'next/router';
import React, { SyntheticEvent, useState } from 'react';
import styles from '../styles/Register.module.css';
import Link from 'next/link';

const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const registerUser = async (e: SyntheticEvent) => {
		e.preventDefault();

		await fetch('http://localhost:5000/api/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		});
		await router.push('/login');
	};

	return (
		<Layout>
			<div className={styles.background}>
				<div className={styles.shape}></div>
				<div className={styles.shape}></div>
			</div>
			<form onSubmit={registerUser} className={styles.form}>
				<h3 className={styles.logo}>
					<p>
						Vision<span>CMS</span>
					</p>
				</h3>

				<label className={styles.label} htmlFor="name">
					Логин
				</label>
				<input
					className={styles.input}
					type="text"
					required
					onChange={(e) => setName(e.target.value)}
				/>

				<label className={styles.label} htmlFor="email">
					Эл. Почта
				</label>
				<input
					className={styles.input}
					type="email"
					required
					onChange={(e) => setEmail(e.target.value)}
				/>

				<label className={styles.label} htmlFor="password">
					Пароль
				</label>
				<input
					className={styles.input}
					type="password"
					required
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button className={styles.btn} type="submit">
					Войти
				</button>
				<div className={styles.login}>
					<label className={styles.label} htmlFor="">
						Уже есть аккаунт?
					</label>
					<Link href="/login">Войти!</Link>
				</div>
			</form>
		</Layout>
	);
};

export default Register;
