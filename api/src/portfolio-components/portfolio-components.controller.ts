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
import { PortfolioComponentsService } from './portfolio-components.service';
import { CreatePortfolioComponentsDto } from './dto/create-portfolio-components.dto';
import * as path from 'path';
import * as fse from 'fs-extra';
import simpleGit, { SimpleGit } from 'simple-git';
import * as archiver from 'archiver';

@Controller('portfolio-components')
export class PortfolioComponentsController {
	private git: SimpleGit;
	constructor(
		private readonly portfolioComponentsService: PortfolioComponentsService,
	) {
		this.git = simpleGit();
	}
	@Post('new')
	async createPortfolioComponents(
		@Body() createPortfolioComponentsDto: CreatePortfolioComponentsDto,
	) {
		const portfolioComponents = await this.portfolioComponentsService.create(
			createPortfolioComponentsDto,
		);

		return portfolioComponents;
	}

	@Get(':portfolioId')
	async findComponentsForPortfolio(@Param('portfolioId') portfolioId: number) {
		return await this.portfolioComponentsService.findComponentsByPortfolioId(
			portfolioId,
		);
	}

	@Get('download/:portfolioId')
	async downloadPortfolio(
		@Res() res,
		@Param('portfolioId') portfolioId: number,
	) {
		const portfolioData =
			await this.portfolioComponentsService.findComponentsByPortfolioId(
				portfolioId,
			);
		const templateURL =
			'https://github.com/BlackVisionn/portfolio-template.git';
		const templateName = 'portfolio-template';
		const pathToArchive = `./sites-templates/${portfolioId}-portfolio-template`;
		const pathForClone = path.join(pathToArchive, templateName);
		try {
			await this.cloneTemplate(pathForClone, templateURL);
			// await this.modifyTemplate(pathForClone);
			await this.createArchive(pathToArchive, portfolioId);
			const createdArchivePath = path.join(
				'./sites-templates',
				`${portfolioId}-portfolio-template.zip`,
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
		portfolioId: number,
	): Promise<void> {
		const templateName = `${portfolioId}-portfolio-template`;
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

	private async modifyTemplate(pathToTemplateFolder: string) {}
}
