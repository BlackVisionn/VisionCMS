import { LendingDTO } from '@/api/dto/lending.dto';
import React, { useState } from 'react';
import styles from '../styles/Site.module.css';
import { AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import { LendingAPI } from '@/api/lending.api';
import EditSiteModal from './EditSiteModal';

interface Props {
	data: LendingDTO;
}

const Site = ({ data }: Props) => {
	const [modalActive, setModalActive] = useState<boolean>();

	const deleteSite = async () => {
		await LendingAPI.delete(data.id);
	};

	return (
		<div>
			<li>
				<div className={styles.listItem}>
					<label className={styles.label}>{data.headerName}</label>
					<div className={styles.btns}>
						<a className={styles.btn} onClick={() => setModalActive(true)}>
							<span className={styles.icon}>
								<AiOutlineEdit />
							</span>
						</a>
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
			<EditSiteModal active={modalActive} setActive={setModalActive} />
		</div>
	);
};

export default Site;
