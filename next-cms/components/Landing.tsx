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
	};

	return (
		<div>
			<li className={styles.siteItem}>
				<div className={styles.siteDetails}>
					<div className={styles.siteInfo}>
						<div className={styles.siteType}>Landing</div>
						<div className={styles.siteName}>{data.headerName}</div>
					</div>
					<div className={styles.buttons}>
						<button>
							<Link href={`/admin/sites/`} className={styles.btn}>
								<span className={styles.icon}>
									<AiOutlineDownload />
								</span>
							</Link>
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
