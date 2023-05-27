import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
	MdAddCircleOutline,
	MdOutlineLogout,
	MdFormatListBulleted,
} from 'react-icons/md';
import styles from '../styles/Sidebar.module.css';
import { UserAPI } from '@/api/user.api';

const Sidebar = () => {
	const router = useRouter();

	const logout = async () => {
		await UserAPI.logoutUser();
		await router.push('/login');
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
							href="/admin/new-site/templates"
							className={`${
								(router.pathname == '/admin/new-site/templates'
									? `${styles.active}`
									: '') ||
								(router.pathname == '/admin/new-site/portfolio/components'
									? `${styles.active}`
									: '') ||
								(router.pathname == '/admin/new-site/landing/components'
									? `${styles.active}`
									: '')
							} ${styles.sidebarLink}`}
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
