import { IsBoolean, IsOptional, IsString } from 'class-validator';
// import { Category } from "src/category/entities/category.entity";

export class CreateLendingDto {
	@IsOptional()
	@IsString()
	headerName: string;
	@IsOptional()
	@IsString()
	headerDescription: string;
	@IsOptional()
	@IsString()
	mainImg: string;
	@IsOptional()
	@IsString()
	navIntroduction: string;
	@IsOptional()
	@IsString()
	introductionTitle: string;
	@IsOptional()
	@IsString()
	introductionDescription: string;
	@IsOptional()
	@IsString()
	navAbout: string;
	@IsOptional()
	@IsString()
	aboutTitle: string;
	@IsOptional()
	@IsString()
	aboutDescription: string;
	@IsOptional()
	@IsString()
	navContact: string;
	@IsOptional()
	@IsString()
	contactTitle: string;
	@IsOptional()
	@IsString()
	contactDescription: string;
	@IsOptional()
	@IsString()
	footerCompany: string;
	@IsOptional()
	@IsBoolean()
	useHeader: boolean;
	@IsOptional()
	@IsBoolean()
	useMainImg: boolean;
	@IsOptional()
	@IsBoolean()
	useNavIntroduction: boolean;
	@IsOptional()
	@IsBoolean()
	useNavAbout: boolean;
	@IsOptional()
	@IsBoolean()
	useNavContact: boolean;
	@IsOptional()
	@IsBoolean()
	useFooter: boolean;
}
