import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Layout.module.css';
import Head from 'next/head';

const Layout = (props: any) => {
	const router = useRouter();

	const logout = async () => {
		await fetch('http://localhost:5000/api/logout', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		});
		await router.push('/login');
	};
	let menu;
	if (!props.auth) {
		menu = (
			<nav className={styles.navbar}>
				<Link href="/" className={styles.logo}>
					<p>
						Vision<span>CMS</span>
					</p>
				</Link>
				<div>
					<ul>
						<li>
							<Link href="/login" className={styles.link}>
								Вход
							</Link>
						</li>
						<li>
							<Link href="/register" className={styles.link}>
								Регистрация
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		);
	} else {
		menu = (
			<nav className={styles.navbar}>
				<Link href="/admin" className={styles.logo}>
					<p>
						Vision<span>CMS</span>
					</p>
				</Link>
				<div>
					<ul>
						<li>
							<Link href="#" className={styles.link} onClick={logout}>
								Выход
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
	return (
		<div>
			<Head>
				<title>VisionCMS</title>
			</Head>
			{menu}
			<main>{props.children}</main>
		</div>
	);
};

export default Layout;
