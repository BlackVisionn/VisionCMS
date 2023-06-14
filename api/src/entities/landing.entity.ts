import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	ManyToOne,
	OneToOne,
} from 'typeorm';
import { User } from './user.entity';
import { LandingComponents } from './landing-components.entity';
@Entity('landings')
export class Landing {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ default: 'Landing' })
	templateType: string;
	@Column({ default: 'landing-template' })
	templateName: string;

	// HEADER
	@Column({ default: 'Добро пожаловать на мой лендинг' })
	headerName: string;
	@Column({
		default:
			'Здесь вы можете найти всю необходимую информацию о нашей компании или продукте.',
	})
	headerDescription: string;
	@Column({ default: 'Особенности' })
	featuresNavItemName: string;
	@Column({ default: 'О нас' })
	aboutNavItemName: string;
	@Column({ default: 'Услуги' })
	servicesNavItemName: string;
	@Column({ default: 'Портфолио' })
	portfolioNavItemName: string;
	@Column({ default: 'Команда' })
	teamNavItemName: string;
	@Column({ default: 'Контакты' })
	contactNavItemName: string;
	@Column({ default: 'Свяжитесь с нами' })
	buttonName: string;

	// FEATURES
	@Column({ default: 'Особенности' })
	featuresHeader: string;
	@Column({ default: 'Быстрая и надежная доставка' })
	firstFeaturesItemList: string;
	@Column({ default: 'Широкий ассортимент товаров' })
	secondFeaturesItemList: string;
	@Column({ default: 'Отличное качество продукции' })
	thirdFeaturesItemList: string;

	// ABOUT
	@Column({ default: 'О нас' })
	aboutHeader: string;
	@Column({
		default:
			'Мы - компания, специализирующаяся на предоставлении услуг в сфере электронной коммерции. Наша команда из опытных профессионалов помогает клиентам достичь успеха в онлайн-бизнесе. Мы предлагаем индивидуальный	подход к каждому проекту и стремимся к высокому уровню удовлетворенности клиентов.',
	})
	aboutDescription: string;

	// SERVICES
	@Column({ default: 'Услуги' })
	servicesHeader: string;
	@Column({ default: 'Разработка и дизайн интернет-магазинов' })
	firstServicesItemList: string;
	@Column({ default: 'Оптимизация сайтов для поисковых систем' })
	secondServicesItemList: string;
	@Column({ default: 'Создание логотипов и фирменного стиля' })
	thirdServicesItemList: string;

	// PORTFOLIO
	@Column({ default: 'Портфолио' })
	portfolioHeader: string;
	@Column({
		default: 'Наше портфолио включает различные проекты, среди которых:',
	})
	portfolioDescription: string;
	@Column({ default: 'Интернет-магазин' })
	firstPortoflioItemListProjectDescription: string;
	@Column({ default: 'Fashion Style' })
	firstPortoflioItemListProjectName: string;
	@Column({ default: 'https://ya.ru/' })
	firstPortoflioItemListProjectUrl: string;
	@Column({ default: 'Сайт о здоровом образе жизни' })
	secondPortoflioItemListProjectDescription: string;
	@Column({ default: 'Healthy Living' })
	secondPortoflioItemListProjectName: string;
	@Column({ default: 'https://ya.ru/' })
	secondPortoflioItemListProjectUrl: string;
	@Column({ default: 'Лэндинг для туристической компании' })
	thirdPortoflioItemListProjectDescription: string;
	@Column({ default: 'Travel Explore' })
	thirdPortoflioItemListProjectName: string;
	@Column({ default: 'https://ya.ru/' })
	thirdPortoflioItemListProjectUrl: string;

	// TEAM
	@Column({ default: 'Команда' })
	teamHeader: string;
	@Column({
		default: 'Мы гордимся нашей высококвалифицированной командой специалистов:',
	})
	teamDescription: string;
	@Column({ default: 'Иван Иванов' })
	firstTeamItemListEmployeeName: string;
	@Column({ default: 'руководитель проекта' })
	firstTeamItemListEmployeePosition: string;
	@Column({ default: 'Анна Петрова' })
	secondTeamItemListEmployeeName: string;
	@Column({ default: 'веб-дизайнер' })
	secondTeamItemListEmployeePosition: string;
	@Column({ default: 'Максим Сидоров' })
	thirdTeamItemListEmployeeName: string;
	@Column({ default: 'разработчик' })
	thirdTeamItemListEmployeePosition: string;

	// CONTACT
	@Column({ default: 'Контакты' })
	contactHeader: string;
	@Column({ default: 'Свяжитесь с нами, чтобы обсудить ваш проект:' })
	contactDescription: string;
	@Column({ default: 'Email' })
	firstContactItemListName: string;
	@Column({ default: 'info@example.com' })
	firstContactItemListInfo: string;
	@Column({ default: 'Телефон' })
	secondContactItemListName: string;
	@Column({ default: '+123456789' })
	secondContactItemListInfo: string;
	@Column({ default: 'Адрес' })
	thirdContactItemListName: string;
	@Column({ default: 'ул. Примерная, 123' })
	thirdContactItemListInfo: string;

	// FOOTER
	@Column({ default: '© 2023 Ваш лендинг. Все права защищены.' })
	footerDescription: string;

	@Column({ default: null })
	userId: number;

	@OneToOne(
		() => LandingComponents,
		(landingComponent) => landingComponent.landing,
	)
	landingComponents: LandingComponents;

	@ManyToOne(() => User, (user) => user.landings, { eager: true })
	@JoinColumn({
		name: 'userId',
		referencedColumnName: 'id',
	})
	user: User;
}
