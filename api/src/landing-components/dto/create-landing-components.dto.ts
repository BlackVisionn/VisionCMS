import { IsOptional, IsBoolean } from 'class-validator';

export class CreateLandingComponentsDto {
	@IsOptional()
	@IsBoolean()
	useHeader: boolean;
	@IsOptional()
	@IsBoolean()
	useFeatures: boolean;
	@IsOptional()
	@IsBoolean()
	useAbout: boolean;
	@IsOptional()
	@IsBoolean()
	useServices: boolean;
	@IsOptional()
	@IsBoolean()
	usePortfolio: boolean;
	@IsOptional()
	@IsBoolean()
	useTeam: boolean;
	@IsOptional()
	@IsBoolean()
	useContact: boolean;
	@IsOptional()
	@IsBoolean()
	useFooter: boolean;
}
