import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePortfolioDto {
	@IsOptional()
	@IsString()
	templateType: string;
	@IsOptional()
	@IsString()
	templateName: string;
	@IsOptional()
	@IsString()
	headerTitle: string;
	@IsOptional()
	@IsString()
	headerDescription: string;
	@IsOptional()
	@IsString()
	headerUrlVk: string;
	@IsOptional()
	@IsString()
	headerUrlTelegram: string;
	@IsOptional()
	@IsString()
	headerUrlGit: string;
	@IsOptional()
	@IsString()
	aboutTitle: string;
	@IsOptional()
	@IsString()
	aboutFirstParagraph: string;
	@IsOptional()
	@IsString()
	aboutSecondParagraph: string;
	@IsOptional()
	@IsString()
	projectsTitle: string;
	@IsOptional()
	@IsString()
	firstProjectTitle: string;
	@IsOptional()
	@IsString()
	firstProjectDate: string;
	@IsOptional()
	@IsString()
	firstProjectUrl: string;
	@IsOptional()
	@IsString()
	secondProjectTitle: string;
	@IsOptional()
	@IsString()
	secondProjectDate: string;
	@IsOptional()
	@IsString()
	secondProjectUrl: string;
	@IsOptional()
	@IsString()
	thirdProjectTitle: string;
	@IsOptional()
	@IsString()
	thirdProjectDate: string;
	@IsOptional()
	@IsString()
	thirdProjectUrl: string;
	@IsOptional()
	@IsString()
	workTitle: string;
	@IsOptional()
	@IsString()
	firstWorkPosition: string;
	@IsOptional()
	@IsString()
	firstWorkCompanyName: string;
	@IsOptional()
	@IsString()
	firstWorkDates: string;
	@IsOptional()
	@IsString()
	firstWorkDescription: string;
	@IsOptional()
	@IsString()
	firstWorkUrl: string;
	@IsOptional()
	@IsString()
	secondtWorkPosition: string;
	@IsOptional()
	@IsString()
	secondWorkCompanyName: string;
	@IsOptional()
	@IsString()
	secondWorkDates: string;
	@IsOptional()
	@IsString()
	secondWorkDescription: string;
	@IsOptional()
	@IsString()
	secondWorkUrl: string;
	@IsOptional()
	@IsString()
	educationTitle: string;
	@IsOptional()
	@IsString()
	firstEducationTitle: string;
	@IsOptional()
	@IsString()
	firstEducationStudyPlace: string;
	@IsOptional()
	@IsString()
	firstEducationDates: string;
	@IsOptional()
	@IsString()
	secondEducationTitle: string;
	@IsOptional()
	@IsString()
	secondEducationStudyPlace: string;
	@IsOptional()
	@IsString()
	secondEducationDates: string;
	@IsOptional()
	@IsString()
	thirdEducationTitle: string;
	@IsOptional()
	@IsString()
	thirdEducationStudyPlace: string;
	@IsOptional()
	@IsString()
	thirdEducationDates: string;
	@IsOptional()
	@IsString()
	languagesTitle: string;
	@IsOptional()
	@IsString()
	firstLanguageName: string;
	@IsOptional()
	@IsString()
	firstLanguageLevel: string;
	@IsOptional()
	@IsString()
	secondLanguageName: string;
	@IsOptional()
	@IsString()
	secondLanguageLevel: string;
	@IsOptional()
	@IsString()
	thirdLanguageName: string;
	@IsOptional()
	@IsString()
	thirdLanguageLevel: string;
	@IsOptional()
	@IsString()
	contactTitle: string;
	@IsOptional()
	@IsString()
	firstInputPlaceholderName: string;
	@IsOptional()
	@IsString()
	secondInputPlaceholderName: string;
	@IsOptional()
	@IsString()
	textareaPlaceholderName: string;
	@IsOptional()
	@IsString()
	buttonName: string;
	@IsOptional()
	@IsString()
	footerText: string;
	@IsOptional()
	@IsString()
	footerUrlName: string;
	@IsOptional()
	@IsString()
	footerUrlVk: string;
	@IsOptional()
	@IsString()
	footerUrlTelegram: string;
	@IsOptional()
	@IsString()
	footerUrlGit: string;
	@IsOptional()
	@IsNumber()
	userID: number;
}
