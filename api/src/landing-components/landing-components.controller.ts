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
	async updateLandingComponents(
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
		const features: Component = {
			componentFilePath: path.join(
				pathToTemplateFolder,
				'components/Features.tsx',
			),
			componentName: '<Features />',
			componentImport: 'import Features from "@/components/Features";',
		};
		const about: Component = {
			componentFilePath: path.join(
				pathToTemplateFolder,
				'components/About.tsx',
			),
			componentName: '<About />',
			componentImport: 'import About from "@/components/About";',
		};
		const services: Component = {
			componentFilePath: path.join(
				pathToTemplateFolder,
				'components/Services.tsx',
			),
			componentName: '<Services />',
			componentImport: 'import Services from "@/components/Services";',
		};
		const portfolio: Component = {
			componentFilePath: path.join(
				pathToTemplateFolder,
				'components/Portfolio.tsx',
			),
			componentName: '<Portfolio />',
			componentImport: 'import Portfolio from "@/components/Portfolio";',
		};
		const team: Component = {
			componentFilePath: path.join(pathToTemplateFolder, 'components/Team.tsx'),
			componentName: '<Team />',
			componentImport: 'import Team from "@/components/Team";',
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
		if (landingData.useHeader) {
			await this.changeComponentInTemplate(
				header.componentFilePath,
				'headerName',
				landingData.landing.headerName,
			);
			await this.changeComponentInTemplate(
				header.componentFilePath,
				'headerDescription',
				landingData.landing.headerDescription,
			);
			if (landingData.useFeatures) {
				await this.changeComponentInTemplate(
					header.componentFilePath,
					'featuresNavItemName',
					landingData.landing.featuresNavItemName,
				);
			} else {
				await this.deleteCodeFromTemplate(
					header.componentFilePath,
					'<li><a href="#features">featuresNavItemName</a></li>',
				);
			}
			if (landingData.useAbout) {
				await this.changeComponentInTemplate(
					header.componentFilePath,
					'aboutNavItemName',
					landingData.landing.aboutNavItemName,
				);
			} else {
				await this.deleteCodeFromTemplate(
					header.componentFilePath,
					'<li><a href="#about">aboutNavItemName</a></li>',
				);
			}
			if (landingData.useServices) {
				await this.changeComponentInTemplate(
					header.componentFilePath,
					'servicesNavItemName',
					landingData.landing.servicesNavItemName,
				);
			} else {
				await this.deleteCodeFromTemplate(
					header.componentFilePath,
					'<li><a href="#services">servicesNavItemName</a></li>',
				);
			}
			if (landingData.usePortfolio) {
				await this.changeComponentInTemplate(
					header.componentFilePath,
					'portfolioNavItemName',
					landingData.landing.portfolioNavItemName,
				);
			} else {
				await this.deleteCodeFromTemplate(
					header.componentFilePath,
					'<li><a href="#portfolio">portfolioNavItemName</a></li>',
				);
			}
			if (landingData.useTeam) {
				await this.changeComponentInTemplate(
					header.componentFilePath,
					'teamNavItemName',
					landingData.landing.teamNavItemName,
				);
			} else {
				await this.deleteCodeFromTemplate(
					header.componentFilePath,
					'<li><a href="#team">teamNavItemName</a></li>',
				);
			}
			if (landingData.useContact) {
				await this.changeComponentInTemplate(
					header.componentFilePath,
					'contactNavItemName',
					landingData.landing.contactNavItemName,
				);
				await this.changeComponentInTemplate(
					header.componentFilePath,
					'buttonName',
					landingData.landing.buttonName,
				);
			} else {
				await this.deleteCodeFromTemplate(
					header.componentFilePath,
					'<li><a href="#contact">contactNavItemName</a></li>',
				);
				await this.deleteCodeFromTemplate(
					header.componentFilePath,
					'<a href="#contact" className="btn interactive-button">buttonName</a>',
				);
			}
		} else {
			await this.deleteComponentFromTemplate(
				indexPath,
				header.componentName,
				header.componentImport,
				header.componentFilePath,
			);
		}
		// FEATURES
		if (landingData.useFeatures) {
			await this.changeComponentInTemplate(
				features.componentFilePath,
				'featuresHeader',
				landingData.landing.featuresHeader,
			);
			await this.changeComponentInTemplate(
				features.componentFilePath,
				'firstFeaturesItemList',
				landingData.landing.firstFeaturesItemList,
			);
			await this.changeComponentInTemplate(
				features.componentFilePath,
				'secondFeaturesItemList',
				landingData.landing.secondFeaturesItemList,
			);
			await this.changeComponentInTemplate(
				features.componentFilePath,
				'thirdFeaturesItemList',
				landingData.landing.thirdFeaturesItemList,
			);
		} else {
			await this.deleteComponentFromTemplate(
				indexPath,
				features.componentName,
				features.componentImport,
				features.componentFilePath,
			);
		}
		// ABOUT
		if (landingData.useAbout) {
			await this.changeComponentInTemplate(
				about.componentFilePath,
				'aboutHeader',
				landingData.landing.aboutHeader,
			);
			await this.changeComponentInTemplate(
				about.componentFilePath,
				'aboutDescription',
				landingData.landing.aboutDescription,
			);
		} else {
			await this.deleteComponentFromTemplate(
				indexPath,
				about.componentName,
				about.componentImport,
				about.componentFilePath,
			);
		}
		// SERVICES
		if (landingData.useServices) {
			await this.changeComponentInTemplate(
				services.componentFilePath,
				'servicesHeader',
				landingData.landing.servicesHeader,
			);
			await this.changeComponentInTemplate(
				services.componentFilePath,
				'firstServicesItemList',
				landingData.landing.firstServicesItemList,
			);
			await this.changeComponentInTemplate(
				services.componentFilePath,
				'secondServicesItemList',
				landingData.landing.secondServicesItemList,
			);
			await this.changeComponentInTemplate(
				services.componentFilePath,
				'thirdServicesItemList',
				landingData.landing.thirdServicesItemList,
			);
		} else {
			await this.deleteComponentFromTemplate(
				indexPath,
				services.componentName,
				services.componentImport,
				services.componentFilePath,
			);
		}

		// PORTFOLIO
		if (landingData.usePortfolio) {
			await this.changeComponentInTemplate(
				portfolio.componentFilePath,
				'portfolioHeader',
				landingData.landing.portfolioHeader,
			);
			await this.changeComponentInTemplate(
				portfolio.componentFilePath,
				'portfolioDescription',
				landingData.landing.portfolioDescription,
			);
			await this.changeComponentInTemplate(
				portfolio.componentFilePath,
				'firstPortoflioItemListProjectDescription',
				landingData.landing.firstPortoflioItemListProjectDescription,
			);
			await this.changeComponentInTemplate(
				portfolio.componentFilePath,
				'firstPortoflioItemListProjectUrl',
				landingData.landing.firstPortoflioItemListProjectUrl,
			);
			await this.changeComponentInTemplate(
				portfolio.componentFilePath,
				'firstPortoflioItemListProjectName',
				landingData.landing.firstPortoflioItemListProjectName,
			);
			await this.changeComponentInTemplate(
				portfolio.componentFilePath,
				'secondPortoflioItemListProjectDescription',
				landingData.landing.secondPortoflioItemListProjectDescription,
			);
			await this.changeComponentInTemplate(
				portfolio.componentFilePath,
				'secondPortoflioItemListProjectUrl',
				landingData.landing.secondPortoflioItemListProjectUrl,
			);
			await this.changeComponentInTemplate(
				portfolio.componentFilePath,
				'secondPortoflioItemListProjectName',
				landingData.landing.secondPortoflioItemListProjectName,
			);
			await this.changeComponentInTemplate(
				portfolio.componentFilePath,
				'thirdPortoflioItemListProjectDescription',
				landingData.landing.thirdPortoflioItemListProjectDescription,
			);
			await this.changeComponentInTemplate(
				portfolio.componentFilePath,
				'thirdPortoflioItemListProjectUrl',
				landingData.landing.thirdPortoflioItemListProjectUrl,
			);
			await this.changeComponentInTemplate(
				portfolio.componentFilePath,
				'thirdPortoflioItemListProjectName',
				landingData.landing.thirdPortoflioItemListProjectName,
			);
		} else {
			await this.deleteComponentFromTemplate(
				indexPath,
				portfolio.componentName,
				portfolio.componentImport,
				portfolio.componentFilePath,
			);
		}

		// TEAM
		if (landingData.useTeam) {
			await this.changeComponentInTemplate(
				team.componentFilePath,
				'headerName',
				landingData.landing.headerName,
			);
		} else {
			await this.deleteComponentFromTemplate(
				indexPath,
				team.componentName,
				team.componentImport,
				team.componentFilePath,
			);
		}

		// CONTACT
		if (landingData.useContact) {
			await this.changeComponentInTemplate(
				contact.componentFilePath,
				'headerName',
				landingData.landing.headerName,
			);
		} else {
			await this.deleteComponentFromTemplate(
				indexPath,
				contact.componentName,
				contact.componentImport,
				contact.componentFilePath,
			);
		}

		// FOOTER
		if (landingData.useFooter) {
			await this.changeComponentInTemplate(
				footer.componentFilePath,
				'headerName',
				landingData.landing.headerName,
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
	private async deleteCodeFromTemplate(
		indexPath: string,
		deletingCode: string,
	) {
		let fileContent;
		fileContent = fse.readFileSync(indexPath, 'utf-8');
		fileContent = fileContent.replace(deletingCode, '');
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
		fileContent = fileContent.replace(oldElement, newElement);
		fse.writeFileSync(filePath, fileContent, 'utf-8');
	}
}
