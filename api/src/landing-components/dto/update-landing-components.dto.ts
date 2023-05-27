import { PartialType } from '@nestjs/mapped-types';
import { CreateLandingComponentsDto } from './create-landing-components.dto';

export class UpdateLandingComponentsDto extends PartialType(
	CreateLandingComponentsDto,
) {}
