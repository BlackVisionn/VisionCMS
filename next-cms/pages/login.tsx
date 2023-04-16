import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import React, { SyntheticEvent, useState } from 'react';
import styles from '../styles/Login.module.css';
import Link from 'next/link';
import { UserAPI } from '@/api/user.api';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const loginUser = async (e: SyntheticEvent) => {
		e.preventDefault();

		await UserAPI.loginUser(email, password);
		await router.push('/admin');
	};

	return (
		<Layout>
			<div className={styles.background}>
				<div className={styles.shape}></div>
				<div className={styles.shape}></div>
			</div>
			<form onSubmit={loginUser} className={styles.form}>
				<Link href="/" className={styles.homeLink}>
					<h3 className={styles.logo}>
						<p>
							Vision<span>CMS</span>
						</p>
					</h3>
				</Link>

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
				<div className={styles.register}>
					<label className={styles.label} htmlFor="">
						Не зарегистрированы?
					</label>
					<Link href="/register">Зарегистрируйтесь!</Link>
				</div>
			</form>
		</Layout>
	);
};

export default Login;
