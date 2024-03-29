import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<div>
			<div className={styles.background}>
				<div className={styles.shape}></div>
				<div className={styles.shape}></div>
			</div>
			<div className={styles.info}>
				<h3 className={styles.logo}>
					<p>
						Vision<span>CMS</span>
					</p>
				</h3>
				<p className={styles.infoTitle}>Управляй контентом сайта просто</p>
				<Link href="/login">
					<button className={styles.btn}>Начать</button>
				</Link>
			</div>
		</div>
	);
}
