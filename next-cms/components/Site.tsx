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

const Site = ({ data }: Props) => {
	const deleteSite = async () => {
		await LendingAPI.delete(data.id);
	};

	return (
		<div>
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
						<button className={styles.btn} onClick={deleteSite}>
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

export default Site;
