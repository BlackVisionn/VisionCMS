import {
	Body,
	Controller,
	Get,
	Post,
	Delete,
	Patch,
	Res,
	Param,
} from '@nestjs/common';
import { LandingComponentsService } from './landing-components.service';
import { CreateLandingComponentsDto } from './dto/create-landing-components.dto';
import * as path from 'path';
import * as fse from 'fs-extra';
import simpleGit, { SimpleGit } from 'simple-git';
import * as archiver from 'archiver';
import { LandingComponents } from 'src/entities/landing-components.entity';
import { UpdateLandingComponentsDto } from './dto/update-landing-components.dto';

@Controller('landing-components')
export class LandingComponentsController {
	private git: SimpleGit;
	constructor(
		private readonly landingComponentsService: LandingComponentsService,
	) {
		this.git = simpleGit();
	}
	@Patch(':id')
	async updateLanding(
		@Param('id') id: number,
		@Body() updateLandingComponentsDto: UpdateLandingComponentsDto,
	) {
		return await this.landingComponentsService.update(
			id,
			updateLandingComponentsDto,
		);
	}
	@Post('new')
	async createLandingComponents(
		@Body() createLandingComponentsDto: CreateLandingComponentsDto,
	) {
		const landingComponents = await this.landingComponentsService.create(
			createLandingComponentsDto,
		);

		return landingComponents;
	}

	@Get(':landingId')
	async findComponentsForLanding(@Param('landingId') landingId: number) {
		return await this.landingComponentsService.findComponentsByLandingId(
			landingId,
		);
	}
	@Get('landing-data/:landingId')
	async getLandingData(@Param('landingId') landingId: number) {
		return await this.landingComponentsService.findLanding(landingId);
	}

	@Get('download/:landingId')
	async downloadLanding(@Res() res, @Param('landingId') landingId: number) {
		const landingData = await this.landingComponentsService.findLanding(
			landingId,
		);
		const templateURL = 'https://github.com/BlackVisionn/landing-template.git';
		const templateName = 'landing-template';
		const pathToArchive = `./sites-templates/${landingId}-landing-template`;
		const pathForClone = path.join(pathToArchive, templateName);
		try {
			await this.cloneTemplate(pathForClone, templateURL);
			await this.modifyTemplate(pathForClone, landingData);
			await this.createArchive(pathToArchive, landingId);
			const createdArchivePath = path.join(
				'./sites-templates',
				`${landingId}-landing-template.zip`,
			);

			res.setHeader('Content-Type', 'application/zip');
			res.setHeader(
				'Content-Disposition',
				`attachment; filename=${templateName}.zip`,
			);

			const archiveStream = fse.createReadStream(createdArchivePath);
			archiveStream.pipe(res);
		} catch (error) {
			console.error('Failed to clone repository:', error);
			throw new Error('Failed to clone repository');
		}
	}
	private async cloneTemplate(pathForClone: string, templateURL: string) {
		await fse.emptyDir(pathForClone);
		await this.git.clone(templateURL, pathForClone);
	}
	private async createArchive(
		pathToArchive: string,
		landingId: number,
	): Promise<void> {
		const templateName = `${landingId}-landing-template`;
		const outputFilePath = path.join(
			'./sites-templates',
			`${templateName}.zip`,
		);

		const output = fse.createWriteStream(outputFilePath);
		const archive = archiver('zip', { zlib: { level: 9 } });

		archive.pipe(output);
		archive.directory(pathToArchive, false);

		await archive.finalize();
	}

	private async modifyTemplate(
		pathToTemplateFolder: string,
		landingData: LandingComponents,
	) {
		type Component = {
			componentFilePath: string;
			componentName: string;
			componentImport: string;
		};
		const header: Component = {
			componentFilePath: path.join(
				pathToTemplateFolder,
				'components/Header.tsx',
			),
			componentName: '<Header />',
			componentImport: 'import Header from "@/components/Header";',
		};

		const indexPath = path.join(pathToTemplateFolder, 'pages/index.tsx');

		// HEADER
		if (landingData.useHeader) {
			// fileContent = fse.readFileSync(headerPath, 'utf-8');
			// fileContent = fileContent.replace('<About />', '');
			// fs.writeFileSync(filePath, fileContent, 'utf-8');
			// то меняем значения которые задал пользователь этому компоненту
		} else {
			await this.deleteComponentFromTemplate(
				indexPath,
				header.componentName,
				header.componentImport,
				header.componentFilePath,
			);
		}
	}
	private async deleteComponentFromTemplate(
		indexPath: string,
		deletingComponent: string,
		deletingComponentImport: string,
		deletingComponentFile: string,
	) {
		let fileContent;
		fse.unlinkSync(deletingComponentFile);
		fileContent = fse.readFileSync(indexPath, 'utf-8');
		fileContent = fileContent.replace(deletingComponent, '');
		fse.writeFileSync(indexPath, fileContent, 'utf-8');
		fileContent = fileContent.replace(/^\s*[\r\n]/gm, '');
		fse.writeFileSync(indexPath, fileContent, 'utf-8');
		fileContent = fileContent.replace(deletingComponentImport, '');
		fse.writeFileSync(indexPath, fileContent, 'utf-8');
		fileContent = fileContent.replace(/^\s*[\r\n]/gm, '');
		fse.writeFileSync(indexPath, fileContent, 'utf-8');
	}
}
