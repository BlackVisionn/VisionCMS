import { LendingDTO } from '@/api/dto/lending.dto';
import React, { useState } from 'react';
import styles from '../styles/Site.module.css';
import { AiOutlineEdit, AiOutlineDownload } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import { LendingAPI } from '@/api/lending.api';
import Link from 'next/link';

interface Props {
	data: LendingDTO;
}

const Lending = ({ data }: Props) => {
	const deleteLending = async () => {
		await LendingAPI.delete(data.id);
	};

	return (
		<div>
			<li className={styles.siteItem}>
				<div className={styles.siteDetails}>
					<div className={styles.siteInfo}>
						<div className={styles.siteType}>Lending</div>
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
								href={`/admin/site/lending/edit/${data.id}`}
								className={styles.btn}
							>
								<span className={styles.icon}>
									<AiOutlineEdit />
								</span>
							</Link>
						</button>
						<button className={styles.btn} onClick={deleteLending}>
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
export default Lending;

{
	/* <div>
			<li>
				<div className={styles.listItem}>
					<label className={styles.label}>{data.headerName}</label>
					<div className={styles.btns}>
						<Link href={`/admin/site/${data.id}`} className={styles.btn}>
							<span className={styles.icon}>
								<AiOutlineDownload />
							</span>
						</Link>
						<Link href={`/admin/site/edit/${data.id}`} className={styles.btn}>
							<span className={styles.icon}>
								<AiOutlineEdit />
							</span>
						</Link>
						<button className={styles.btn} onClick={deleteLending}>
							<span className={styles.icon}>
								<BiTrash />
							</span>
						</button>
					</div>
				</div>
			</li>
		</div> */
}
