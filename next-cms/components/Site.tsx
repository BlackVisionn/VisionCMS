import { LendingDTO } from '@/api/dto/lending.dto';
import React from 'react';
import styles from '../styles/Site.module.css';
import { AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import { LendingAPI } from '@/api/lending.api';

interface Props {
	data: LendingDTO;
}

const Site = ({ data }: Props) => {
	const deleteSite = async () => {
		await LendingAPI.delete(data.id);
	};
	return (
		<li>
			<div className={styles.listItem}>
				<label className={styles.label}>{data.headerName}</label>
				<div className={styles.btns}>
					<button className={styles.btn}>
						<span className={styles.icon}>
							<AiOutlineEdit />
						</span>
					</button>
					<button className={styles.btn}>
						<span className={styles.icon}>
							<AiOutlineEye />
						</span>
					</button>
					<button className={styles.btn} onClick={deleteSite}>
						<span className={styles.icon}>
							<BiTrash />
						</span>
					</button>
				</div>
			</div>
		</li>
	);
};

export default Site;
