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
import { PortfolioComponents } from 'src/entities/portfolio-components.entity';
import { UpdatePortfolioComponentsDto } from './dto/update-portfolio-components.dto';

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

	@Patch(':id')
	async updatePortfolioComponents(
		@Param('id') id: number,
		@Body() updatePortfolioComponentsDto: UpdatePortfolioComponentsDto,
	) {
		return await this.portfolioComponentsService.update(
			id,
			updatePortfolioComponentsDto,
		);
	}
	@Get('portfolio-data/:portfolioId')
	async getPortfolioData(@Param('portfolioId') portfolioId: number) {
		return await this.portfolioComponentsService.findPortfolio(portfolioId);
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
		const portfolioData = await this.portfolioComponentsService.findPortfolio(
			portfolioId,
		);
		const templateURL =
			'https://github.com/BlackVisionn/portfolio-template.git';
		const templateName = 'portfolio-template';
		const pathToArchive = `./sites-templates/${portfolioId}-portfolio-template`;
		const pathForClone = path.join(pathToArchive, templateName);
		try {
			await this.cloneTemplate(pathForClone, templateURL);
			await this.modifyTemplate(pathForClone, portfolioData);
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

	private async modifyTemplate(
		pathToTemplateFolder: string,
		portfolioData: PortfolioComponents,
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
		const about: Component = {
			componentFilePath: path.join(
				pathToTemplateFolder,
				'components/About.tsx',
			),
			componentName: '<About />',
			componentImport: 'import About from "@/components/About";',
		};

		const projects: Component = {
			componentFilePath: path.join(
				pathToTemplateFolder,
				'components/Projects.tsx',
			),
			componentName: '<Projects />',
			componentImport: 'import Projects from "@/components/Projects";',
		};

		const work: Component = {
			componentFilePath: path.join(pathToTemplateFolder, 'components/Work.tsx'),
			componentName: '<Work />',
			componentImport: 'import Work from "@/components/Work";',
		};

		const education: Component = {
			componentFilePath: path.join(
				pathToTemplateFolder,
				'components/Education.tsx',
			),
			componentName: '<Education />',
			componentImport: 'import Education from "@/components/Education";',
		};

		const languages: Component = {
			componentFilePath: path.join(
				pathToTemplateFolder,
				'components/Languages.tsx',
			),
			componentName: '<Languages />',
			componentImport: 'import Languages from "@/components/Languages";',
		};

		const contact: Component = {
			componentFilePath: path.join(
				pathToTemplateFolder,
				'components/Contact.tsx',
			),
			componentName: '<Contact />',
			componentImport: 'import Contact from "@/components/Contact";',
		};

		const footer: Component = {
			componentFilePath: path.join(
				pathToTemplateFolder,
				'components/Footer.tsx',
			),
			componentName: '<Footer />',
			componentImport: 'import Footer from "@/components/Footer";',
		};
		const indexPath = path.join(pathToTemplateFolder, 'pages/index.tsx');

		let fileContent;

		// HEADER
		if (portfolioData.useHeader) {
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
		// ABOUT
		if (portfolioData.useAbout) {
		} else {
			await this.deleteComponentFromTemplate(
				indexPath,
				about.componentName,
				about.componentImport,
				about.componentFilePath,
			);
		}
		// PROJECTS
		if (portfolioData.useProjects) {
		} else {
			await this.deleteComponentFromTemplate(
				indexPath,
				projects.componentName,
				projects.componentImport,
				projects.componentFilePath,
			);
		}

		//WORK
		if (portfolioData.useWork) {
		} else {
			await this.deleteComponentFromTemplate(
				indexPath,
				work.componentName,
				work.componentImport,
				work.componentFilePath,
			);
		}

		//EDUCATION
		if (portfolioData.useEducation) {
		} else {
			await this.deleteComponentFromTemplate(
				indexPath,
				education.componentName,
				education.componentImport,
				education.componentFilePath,
			);
		}

		//LANGUAGES
		if (portfolioData.useLanguages) {
		} else {
			await this.deleteComponentFromTemplate(
				indexPath,
				languages.componentName,
				languages.componentImport,
				languages.componentFilePath,
			);
		}

		//CONTACT
		if (portfolioData.useContact) {
		} else {
			await this.deleteComponentFromTemplate(
				indexPath,
				contact.componentName,
				contact.componentImport,
				contact.componentFilePath,
			);
		}

		//FOOTER
		if (portfolioData.useFooter) {
		} else {
			await this.deleteComponentFromTemplate(
				indexPath,
				footer.componentName,
				footer.componentImport,
				footer.componentFilePath,
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
