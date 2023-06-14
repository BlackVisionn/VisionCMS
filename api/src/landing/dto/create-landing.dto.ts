import { IsOptional, IsString } from 'class-validator';

export class CreateLandingDto {
	@IsOptional()
	@IsString()
	templateType: string;
	@IsOptional()
	@IsString()
	templateName: string;
	@IsOptional()
	@IsString()
	headerName: string;
	@IsOptional()
	@IsString()
	headerDescription: string;
	@IsOptional()
	@IsString()
	featuresNavItemName: string;
	@IsOptional()
	@IsString()
	aboutNavItemName: string;
	@IsOptional()
	@IsString()
	servicesNavItemName: string;
	@IsOptional()
	@IsString()
	portfolioNavItemName: string;
	@IsOptional()
	@IsString()
	teamNavItemName: string;
	@IsOptional()
	@IsString()
	contactNavItemName: string;
	@IsOptional()
	@IsString()
	buttonName: string;

	@IsOptional()
	@IsString()
	featuresHeader: string;
	@IsOptional()
	@IsString()
	firstFeaturesItemList: string;
	@IsOptional()
	@IsString()
	secondFeaturesItemList: string;
	@IsOptional()
	@IsString()
	thirdFeaturesItemList: string;

	@IsOptional()
	@IsString()
	aboutHeader: string;
	@IsOptional()
	@IsString()
	aboutDescription: string;
	@IsOptional()
	@IsString()
	servicesHeader: string;
	@IsOptional()
	@IsString()
	firstServicesItemList: string;
	@IsOptional()
	@IsString()
	secondServicesItemList: string;
	@IsOptional()
	@IsString()
	thirdServicesItemList: string;

	@IsOptional()
	@IsString()
	portfolioHeader: string;
	@IsOptional()
	@IsString()
	portfolioDescription: string;
	@IsOptional()
	@IsString()
	firstPortoflioItemListProjectDescription: string;
	@IsOptional()
	@IsString()
	firstPortoflioItemListProjectName: string;
	@IsOptional()
	@IsString()
	firstPortoflioItemListProjectUrl: string;
	@IsOptional()
	@IsString()
	secondPortoflioItemListProjectDescription: string;
	@IsOptional()
	@IsString()
	secondPortoflioItemListProjectName: string;
	@IsOptional()
	@IsString()
	secondPortoflioItemListProjectUrl: string;
	@IsOptional()
	@IsString()
	thirdPortoflioItemListProjectDescription: string;
	@IsOptional()
	@IsString()
	thirdPortoflioItemListProjectName: string;
	@IsOptional()
	@IsString()
	thirdPortoflioItemListProjectUrl: string;

	@IsOptional()
	@IsString()
	teamHeader: string;
	@IsOptional()
	@IsString()
	teamDescription: string;
	@IsOptional()
	@IsString()
	firstTeamItemListEmployeeName: string;
	@IsOptional()
	@IsString()
	firstTeamItemListEmployeePosition: string;
	@IsOptional()
	@IsString()
	secondTeamItemListEmployeeName: string;
	@IsOptional()
	@IsString()
	secondTeamItemListEmployeePosition: string;
	@IsOptional()
	@IsString()
	thirdTeamItemListEmployeeName: string;
	@IsOptional()
	@IsString()
	thirdTeamItemListEmployeePosition: string;

	@IsOptional()
	@IsString()
	contactHeader: string;
	@IsOptional()
	@IsString()
	contactDescription: string;
	@IsOptional()
	@IsString()
	firstContactItemListName: string;
	@IsOptional()
	@IsString()
	firstContactItemListInfo: string;
	@IsOptional()
	@IsString()
	secondContactItemListName: string;
	@IsOptional()
	@IsString()
	secondContactItemListInfo: string;
	@IsOptional()
	@IsString()
	thirdContactItemListName: string;
	@IsOptional()
	@IsString()
	thirdContactItemListInfo: string;

	@IsOptional()
	@IsString()
	footerDescription: string;
}
