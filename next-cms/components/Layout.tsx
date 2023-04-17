import Head from 'next/head';
import Sidebar from './Sidebar';
import styles from '../styles/Layout.module.css';

const Layout = (props: any) => {
	let menu;
	if (!props.auth) {
		menu = <div></div>;
	} else {
		menu = <Sidebar />;
	}
	return (
		<div className={styles.layout}>
			<Head>
				<title>VisionCMS</title>
				<link rel="icon" href="/logo.jpg" type="image" />
			</Head>
			{menu}
			<main>{props.children}</main>
		</div>
	);
};

export default Layout;
