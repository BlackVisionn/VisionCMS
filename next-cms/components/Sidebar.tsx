import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
	MdAddCircleOutline,
	MdOutlineLogout,
	MdFormatListBulleted,
} from 'react-icons/md';
import styles from '../styles/Sidebar.module.css';
import React, { useEffect, useState, SyntheticEvent } from 'react';

const Sidebar = () => {
	const router = useRouter();

	const [userId, setUserId] = useState(0);

	useEffect(() => {
		(async () => {
			const response = await fetch('http://localhost:5000/auth/user', {
				credentials: 'include',
			});

			const user = await response.json();
			setUserId(user.id);
		})();
	});

	const logout = async () => {
		await fetch('http://localhost:5000/auth/logout', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		});
		await router.push('/login');
	};

	const createLending = async (e: SyntheticEvent) => {
		e.preventDefault();

		await fetch('http://localhost:5000/lending/new', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				userId,
			}),
		});
		await router.push('/admin/new-site');
	};

	return (
		<div>
			<aside className={styles.sidebar}>
				<div className={styles.sidebarTop}>
					<Link href="/admin">
						<Image
							src="/logo.jpg"
							width={80}
							height={80}
							className={styles.sidebarLogo}
							alt="logo"
						/>
					</Link>
					<p className={styles.sidebarLogoName}>
						Vision<span>CMS</span>
					</p>
				</div>
				<ul className={styles.sidebarList}>
					<li className={styles.sidebarItem}>
						<Link
							href="/admin/new-site"
							className={`${
								router.pathname == '/admin/new-site' ? `${styles.active}` : ''
							} ${styles.sidebarLink}`}
							onClick={createLending}
						>
							<span className={styles.sidebarIcon}>
								<MdAddCircleOutline />
							</span>
							<span className={styles.sidebarName}>Создать сайт</span>
						</Link>
					</li>
					<li className={styles.sidebarItem}>
						<Link
							href="/admin/sites"
							className={`${
								router.pathname == '/admin/sites' ? `${styles.active}` : ''
							} ${styles.sidebarLink}`}
						>
							<span className={styles.sidebarIcon}>
								<MdFormatListBulleted />
							</span>
							<span className={styles.sidebarName}>Мои сайты</span>
						</Link>
					</li>
					<li className={styles.sidebarItem}>
						<Link href="#" className={styles.sidebarLink} onClick={logout}>
							<span className={styles.sidebarIcon}>
								<MdOutlineLogout />
							</span>
							<span className={styles.sidebarName}>Выход</span>
						</Link>
					</li>
				</ul>
			</aside>
		</div>
	);
};

export default Sidebar;
