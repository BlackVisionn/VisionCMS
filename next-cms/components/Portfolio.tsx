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

	const downLoadPortfolioTemplate = async () => {
		try {
			const response = await fetch(
				`http://localhost:5000/portfolio-components/download/${data.id}`,
				{
					method: 'GET',
				},
			);

			const blob = await response.blob();
			const downloadUrl = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = downloadUrl;
			link.setAttribute('download', `portfolio-template.zip`);
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
						<button onClick={downLoadPortfolioTemplate} className={styles.btn}>
							<span className={styles.icon}>
								<AiOutlineDownload />
							</span>
						</button>

						<button>
							<Link
								href={`/admin/site/portfolio/edit/${data.id}`}
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

export default Portfolio;
