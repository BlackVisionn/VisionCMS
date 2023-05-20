import { PartialType } from '@nestjs/mapped-types';
import { CreatePortfolioComponentsDto } from './create-portfolio-components.dto';

export class UpdatePortfolioComponentsDto extends PartialType(
	CreatePortfolioComponentsDto,
) {}
