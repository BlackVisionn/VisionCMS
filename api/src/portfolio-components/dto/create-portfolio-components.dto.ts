import { IsBoolean, IsOptional } from 'class-validator';

export class CreatePortfolioComponentsDto {
	@IsOptional()
	@IsBoolean()
	useHeader: boolean;
	@IsOptional()
	@IsBoolean()
	useAbout: boolean;
	@IsOptional()
	@IsBoolean()
	useProjects: boolean;
	@IsOptional()
	@IsBoolean()
	useWork: boolean;
	@IsOptional()
	@IsBoolean()
	useEducation: boolean;
	@IsOptional()
	@IsBoolean()
	useLanguages: boolean;
	@IsOptional()
	@IsBoolean()
	useContact: boolean;
	@IsOptional()
	@IsBoolean()
	useFooter: boolean;
}
