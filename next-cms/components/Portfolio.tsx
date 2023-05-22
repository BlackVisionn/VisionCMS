import styles from '../styles/Site.module.css';
import { AiOutlineEdit, AiOutlineDownload } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import Link from 'next/link';
import { PortfolioDTO } from '@/api/dto/portfolio.dto';
import { PortfolioAPI } from '@/api/portfolio.api';

interface Props {
	data: PortfolioDTO;
}

const Portfolio = ({ data }: Props) => {
	const deleteLending = async () => {
		await PortfolioAPI.delete(data.id);
	};

	return (
		<div>
			<li className={styles.siteItem}>
				<div className={styles.siteDetails}>
					<div className={styles.siteInfo}>
						<div className={styles.siteType}>{data.templateType}</div>
						<div className={styles.siteName}>{data.headerTitle}</div>
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
							<Link href={`/admin/site/portfolio/edit/${data.id}`} className={styles.btn}>
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

export default Portfolio;
