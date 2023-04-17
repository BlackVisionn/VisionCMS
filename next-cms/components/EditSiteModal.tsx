import React from 'react';
import styles from '../styles/Modal.module.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const EditSiteModal = ({ active, setActive }: any) => {
	return (
		<div className={active ? `${styles.modalActive}` : `${styles.modal}`}>
			<a className={styles.closeBtn} onClick={() => setActive(false)}>
				<AiOutlineCloseCircle />
			</a>
		</div>
	);
};

export default EditSiteModal;
