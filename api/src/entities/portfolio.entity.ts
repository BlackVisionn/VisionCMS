import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	ManyToOne,
	OneToOne,
} from 'typeorm';
import { User } from './user.entity';
import { PortfolioComponents } from './portfolio-components.entity';
@Entity('portfolios')
export class Portfolio {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ default: 'Portfolio' })
	templateType: string;

	//HEADER
	@Column({ default: 'I am YOUR NAME' })
	headerTitle: string;
	@Column({ default: 'Web designer' })
	headerDescription: string;
	@Column({ default: 'https://vk.com/' })
	headerUrlVk: string;
	@Column({ default: 'https://web.telegram.org/' })
	headerUrlTelegram: string;
	@Column({ default: 'https://github.com/' })
	headerUrlGit: string;

	//ABOUT
	@Column({ default: 'About me' })
	aboutTitle: string;
	@Column({ default: 'Your First Paragraph About you.' })
	aboutFirstParagraph: string;
	@Column({ default: 'Your Second Paragraph About you.' })
	aboutSecondParagraph: string;

	//PROJECTS
	@Column({ default: 'Projects' })
	projectsTitle: string;
	@Column({ default: 'YOUR PROJECT NAME 1' })
	firstProjectTitle: string;
	@Column({ default: 'June 2017' })
	firstProjectDate: string;
	@Column({ default: 'https://github.com/' })
	firstProjectUrl: string;
	@Column({ default: 'YOUR PROJECT NAME 2' })
	secondProjectTitle: string;
	@Column({ default: 'Month year' })
	secondProjectDate: string;
	@Column({ default: 'https://github.com/' })
	secondProjectUrl: string;
	@Column({ default: 'YOUR PROJECT NAME 3' })
	thirdProjectTitle: string;
	@Column({ default: 'June 2017' })
	thirdProjectDate: string;
	@Column({ default: 'https://github.com/' })
	thirdProjectUrl: string;

	//WORK
	@Column({ default: 'Work' })
	workTitle: string;
	@Column({ default: 'Your first work position' })
	firstWorkPosition: string;
	@Column({ default: 'Your first company name' })
	firstWorkCompanyName: string;
	@Column({ default: '2015-2017' })
	firstWorkDates: string;
	@Column({ default: 'Your first work description.' })
	firstWorkDescription: string;
	@Column({ default: 'https://github.com/' })
	firstWorkUrl: string;
	@Column({ default: 'Your second work position' })
	secondWorkPosition: string;
	@Column({ default: 'Your second company name' })
	secondWorkCompanyName: string;
	@Column({ default: '2015-2017' })
	secondWorkDates: string;
	@Column({ default: 'Your second work description.' })
	secondWorkDescription: string;
	@Column({ default: 'https://github.com/' })
	secondWorkUrl: string;

	//EDUCATION
	@Column({ default: 'Education' })
	educationTitle: string;
	@Column({ default: 'Your first education name' })
	firstEducationTitle: string;
	@Column({ default: 'Your first education study place' })
	firstEducationStudyPlace: string;
	@Column({ default: '2015-2017' })
	firstEducationDates: string;
	@Column({ default: 'Your second education name' })
	secondEducationTitle: string;
	@Column({ default: 'Your second education study place' })
	secondEducationStudyPlace: string;
	@Column({ default: '2015-2017' })
	secondEducationDates: string;
	@Column({ default: 'Your third education name' })
	thirdEducationTitle: string;
	@Column({ default: 'Your third education study place' })
	thirdEducationStudyPlace: string;
	@Column({ default: '2015-2017' })
	thirdEducationDates: string;

	//LANGUAGES
	@Column({ default: 'Languages' })
	languagesTitle: string;
	@Column({ default: 'Language 1' })
	firstLanguageName: string;
	@Column({ default: 'Language level 1' })
	firstLanguageLevel: string;
	@Column({ default: 'Language 2' })
	secondLanguageName: string;
	@Column({ default: 'Language level 2' })
	secondLanguageLevel: string;
	@Column({ default: 'Language 3' })
	thirdLanguageName: string;
	@Column({ default: 'Language level 3' })
	thirdLanguageLevel: string;

	//CONTACT
	@Column({ default: 'Contact' })
	contactTitle: string;
	@Column({ default: 'Email' })
	firstInputPlaceholderName: string;
	@Column({ default: 'Subject' })
	secondInputPlaceholderName: string;
	@Column({ default: 'Enter your message' })
	textareaPlaceholderName: string;
	@Column({ default: 'Send message' })
	buttonName: string;

	//FOOTER
	@Column({ default: '©All right reserved. Design ' })
	footerText: string;
	@Column({ default: 'Your Template' })
	footerUrlName: string;
	@Column({ default: 'https://vk.com/' })
	footerUrlVk: string;
	@Column({ default: 'https://web.telegram.org/' })
	footerUrlTelegram: string;
	@Column({ default: 'https://github.com/' })
	footerUrlGit: string;

	@Column({ default: null })
	userId: number;

	@OneToOne(() => PortfolioComponents)
	portfolioComponents: PortfolioComponents;

	@ManyToOne(() => User, (user) => user.portfolios, { eager: true })
	@JoinColumn({
		name: 'userId',
		referencedColumnName: 'id',
	})
	user: User;
}
