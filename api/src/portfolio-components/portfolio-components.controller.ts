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
import * as escape from 'escape-html';

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
	@Get('delete-template/:portfolioId')
	async deletePortfolioTemplate(@Param('portfolioId') portfolioId: number) {
		const pathToFolder = `./sites-templates/${portfolioId}-portfolio-template`;
		const createdArchivePath = path.join(
			'./sites-templates',
			`${portfolioId}-portfolio-template.zip`,
		);
		this.removeFolder(pathToFolder);
		this.removeZipArchive(createdArchivePath);
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
		// await execSync('npm i', { cwd: pathForClone });
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

		// HEADER
		if (portfolioData.useHeader) {
			await this.changeComponentInTemplate(
				header.componentFilePath,
				'headerTitle',
				portfolioData.portfolio.headerTitle,
			);
			await this.changeComponentInTemplate(
				header.componentFilePath,
				'headerDescription',
				portfolioData.portfolio.headerDescription,
			);
			await this.changeComponentInTemplate(
				header.componentFilePath,
				'headerUrlVk',
				portfolioData.portfolio.headerUrlVk,
			);
			await this.changeComponentInTemplate(
				header.componentFilePath,
				'headerUrlTelegram',
				portfolioData.portfolio.headerUrlTelegram,
			);
			await this.changeComponentInTemplate(
				header.componentFilePath,
				'headerUrlGit',
				portfolioData.portfolio.headerUrlGit,
			);
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
			await this.changeComponentInTemplate(
				about.componentFilePath,
				'aboutTitle',
				portfolioData.portfolio.aboutTitle,
			);
			await this.changeComponentInTemplate(
				about.componentFilePath,
				'aboutFirstParagraph',
				portfolioData.portfolio.aboutFirstParagraph,
			);
			await this.changeComponentInTemplate(
				about.componentFilePath,
				'aboutSecondParagraph',
				portfolioData.portfolio.aboutSecondParagraph,
			);
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
			await this.changeComponentInTemplate(
				projects.componentFilePath,
				'projectsTitle',
				portfolioData.portfolio.projectsTitle,
			);
			await this.changeComponentInTemplate(
				projects.componentFilePath,
				'firstProjectUrl',
				portfolioData.portfolio.firstProjectUrl,
			);
			await this.changeComponentInTemplate(
				projects.componentFilePath,
				'firstProjectTitle',
				portfolioData.portfolio.firstProjectTitle,
			);
			await this.changeComponentInTemplate(
				projects.componentFilePath,
				'firstProjectDate',
				portfolioData.portfolio.firstProjectDate,
			);
			await this.changeComponentInTemplate(
				projects.componentFilePath,
				'secondProjectUrl',
				portfolioData.portfolio.secondProjectUrl,
			);
			await this.changeComponentInTemplate(
				projects.componentFilePath,
				'secondProjectTitle',
				portfolioData.portfolio.secondProjectTitle,
			);
			await this.changeComponentInTemplate(
				projects.componentFilePath,
				'secondProjectDate',
				portfolioData.portfolio.secondProjectDate,
			);
			await this.changeComponentInTemplate(
				projects.componentFilePath,
				'thirdProjectUrl',
				portfolioData.portfolio.thirdProjectUrl,
			);
			await this.changeComponentInTemplate(
				projects.componentFilePath,
				'thirdProjectTitle',
				portfolioData.portfolio.thirdProjectTitle,
			);
			await this.changeComponentInTemplate(
				projects.componentFilePath,
				'thirdProjectDate',
				portfolioData.portfolio.thirdProjectDate,
			);
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
			await this.changeComponentInTemplate(
				work.componentFilePath,
				'workTitle',
				portfolioData.portfolio.workTitle,
			);
			await this.changeComponentInTemplate(
				work.componentFilePath,
				'firstWorkDates',
				portfolioData.portfolio.firstWorkDates,
			);
			await this.changeComponentInTemplate(
				work.componentFilePath,
				'firstWorkPosition',
				portfolioData.portfolio.firstWorkPosition,
			);
			await this.changeComponentInTemplate(
				work.componentFilePath,
				'firstWorkUrl',
				portfolioData.portfolio.firstWorkUrl,
			);
			await this.changeComponentInTemplate(
				work.componentFilePath,
				'firstWorkCompanyName',
				portfolioData.portfolio.firstWorkCompanyName,
			);
			await this.changeComponentInTemplate(
				work.componentFilePath,
				'firstWorkDescription',
				portfolioData.portfolio.firstWorkDescription,
			);
			await this.changeComponentInTemplate(
				work.componentFilePath,
				'secondWorkDates',
				portfolioData.portfolio.secondWorkDates,
			);
			await this.changeComponentInTemplate(
				work.componentFilePath,
				'secondWorkPosition',
				portfolioData.portfolio.secondWorkPosition,
			);
			await this.changeComponentInTemplate(
				work.componentFilePath,
				'secondWorkUrl',
				portfolioData.portfolio.secondWorkUrl,
			);
			await this.changeComponentInTemplate(
				work.componentFilePath,
				'secondWorkCompanyName',
				portfolioData.portfolio.secondWorkCompanyName,
			);
			await this.changeComponentInTemplate(
				work.componentFilePath,
				'secondWorkDescription',
				portfolioData.portfolio.secondWorkDescription,
			);
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
			await this.changeComponentInTemplate(
				education.componentFilePath,
				'educationTitle',
				portfolioData.portfolio.educationTitle,
			);
			await this.changeComponentInTemplate(
				education.componentFilePath,
				'firstEducationDates',
				portfolioData.portfolio.firstEducationDates,
			);
			await this.changeComponentInTemplate(
				education.componentFilePath,
				'firstEducationTitle',
				portfolioData.portfolio.firstEducationTitle,
			);
			await this.changeComponentInTemplate(
				education.componentFilePath,
				'firstEducationStudyPlace',
				portfolioData.portfolio.firstEducationStudyPlace,
			);
			await this.changeComponentInTemplate(
				education.componentFilePath,
				'secondEducationDates',
				portfolioData.portfolio.secondEducationDates,
			);
			await this.changeComponentInTemplate(
				education.componentFilePath,
				'secondEducationTitle',
				portfolioData.portfolio.secondEducationTitle,
			);
			await this.changeComponentInTemplate(
				education.componentFilePath,
				'secondEducationStudyPlace',
				portfolioData.portfolio.secondEducationStudyPlace,
			);
			await this.changeComponentInTemplate(
				education.componentFilePath,
				'thirdEducationDates',
				portfolioData.portfolio.thirdEducationDates,
			);
			await this.changeComponentInTemplate(
				education.componentFilePath,
				'thirdEducationTitle',
				portfolioData.portfolio.thirdEducationTitle,
			);
			await this.changeComponentInTemplate(
				education.componentFilePath,
				'thirdEducationStudyPlace',
				portfolioData.portfolio.thirdEducationStudyPlace,
			);
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
			await this.changeComponentInTemplate(
				languages.componentFilePath,
				'languagesTitle',
				portfolioData.portfolio.languagesTitle,
			);
			await this.changeComponentInTemplate(
				languages.componentFilePath,
				'firstLanguageName',
				portfolioData.portfolio.firstLanguageName,
			);
			await this.changeComponentInTemplate(
				languages.componentFilePath,
				'firstLanguageLevel',
				portfolioData.portfolio.firstLanguageLevel,
			);
			await this.changeComponentInTemplate(
				languages.componentFilePath,
				'secondLanguageName',
				portfolioData.portfolio.secondLanguageName,
			);
			await this.changeComponentInTemplate(
				languages.componentFilePath,
				'secondLanguageLevel',
				portfolioData.portfolio.secondLanguageLevel,
			);
			await this.changeComponentInTemplate(
				languages.componentFilePath,
				'thirdLanguageName',
				portfolioData.portfolio.thirdLanguageName,
			);
			await this.changeComponentInTemplate(
				languages.componentFilePath,
				'thirdLanguageLevel',
				portfolioData.portfolio.thirdLanguageLevel,
			);
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
			await this.changeComponentInTemplate(
				contact.componentFilePath,
				'contactTitle',
				portfolioData.portfolio.contactTitle,
			);
			await this.changeComponentInTemplate(
				contact.componentFilePath,
				'firstInputPlaceholderName',
				portfolioData.portfolio.firstInputPlaceholderName,
			);
			await this.changeComponentInTemplate(
				contact.componentFilePath,
				'secondInputPlaceholderName',
				portfolioData.portfolio.secondInputPlaceholderName,
			);
			await this.changeComponentInTemplate(
				contact.componentFilePath,
				'textareaPlaceholderName',
				portfolioData.portfolio.textareaPlaceholderName,
			);
			await this.changeComponentInTemplate(
				contact.componentFilePath,
				'buttonName',
				portfolioData.portfolio.buttonName,
			);
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
			await this.changeComponentInTemplate(
				footer.componentFilePath,
				'footerText',
				portfolioData.portfolio.footerText,
			);
			await this.changeComponentInTemplate(
				footer.componentFilePath,
				'footerUrl',
				portfolioData.portfolio.footerUrl,
			);
			await this.changeComponentInTemplate(
				footer.componentFilePath,
				'footerUrlName',
				portfolioData.portfolio.footerUrlName,
			);
			await this.changeComponentInTemplate(
				footer.componentFilePath,
				'footerUrlVk',
				portfolioData.portfolio.footerUrlVk,
			);
			await this.changeComponentInTemplate(
				footer.componentFilePath,
				'footerUrlTelegram',
				portfolioData.portfolio.footerUrlTelegram,
			);
			await this.changeComponentInTemplate(
				footer.componentFilePath,
				'footerUrlGit',
				portfolioData.portfolio.footerUrlGit,
			);
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
	private async changeComponentInTemplate(
		filePath: string,
		oldElement: string,
		newElement: string,
	) {
		let fileContent;
		fileContent = fse.readFileSync(filePath, 'utf-8');
		const escapedNewElement = escape(newElement);
		fileContent = fileContent.replace(oldElement, escapedNewElement);
		fse.writeFileSync(filePath, fileContent, 'utf-8');
	}
	private async removeFolder(path: string) {
		try {
			await fse.remove(path);
			console.log(`Папка "${path}" успешно удалена.`);
		} catch (err) {
			console.error(`Ошибка при удалении папки "${path}":`, err);
		}
	}
	private async removeZipArchive(path: string) {
		try {
			await fse.remove(path);

			console.log(`ZIP-архив "${path}" успешно удален.`);
		} catch (err) {
			console.error(`Ошибка при удалении ZIP-архива "${path}":`, err);
		}
	}
}
