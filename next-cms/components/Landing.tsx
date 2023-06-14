import { LandingDTO } from '@/api/dto/landing.dto';
import React, { useState } from 'react';
import styles from '../styles/Site.module.css';
import { AiOutlineEdit, AiOutlineDownload } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import { LandingAPI } from '@/api/landing.api';
import Link from 'next/link';

interface Props {
	data: LandingDTO;
}

const Landing = ({ data }: Props) => {
	const deleteLanding = async () => {
		await LandingAPI.delete(data.id);
		await LandingAPI.deleteFromServer(data.id);
	};
	const downLoadLandingTemplate = async () => {
		try {
			const response = await fetch(
				`http://localhost:5000/landing-components/download/${data.id}`,
				{
					method: 'GET',
				},
			);

			const blob = await response.blob();
			const downloadUrl = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = downloadUrl;
			link.setAttribute('download', `landing-template.zip`);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (error) {
			console.error('Failed to download project:', error);
		}
	};

	return (
		<div>
			<li className={styles.siteItem}>
				<div className={styles.siteDetails}>
					<div className={styles.siteInfo}>
						<div className={styles.siteType}>{data.templateType}</div>
						<div className={styles.siteName}>{data.templateName}</div>
					</div>
					<div className={styles.buttons}>
						<button onClick={downLoadLandingTemplate} className={styles.btn}>
							<span className={styles.icon}>
								<AiOutlineDownload />
							</span>
						</button>
						<button>
							<Link
								href={`/admin/site/landing/edit/${data.id}`}
								className={styles.btn}
							>
								<span className={styles.icon}>
									<AiOutlineEdit />
								</span>
							</Link>
						</button>
						<button className={styles.btn} onClick={deleteLanding}>
							<span className={styles.icon}>
								<BiTrash />
							</span>
						</button>
					</div>
				</div>
			</li>
		</div>
	);
};
export default Landing;
