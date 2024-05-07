#!/usr/bin/env node
import * as p from '@clack/prompts';
import { parseNameAndPath } from '@npm-smith/utils/common';
import {
	createDir,
	loadRenamedCache,
	renameTemplates,
	replaceStringInFiles,
} from '@npm-smith/utils/file';
import { initializeGitRepo, isGitInitialized } from '@npm-smith/utils/git';
import { install } from '@npm-smith/utils/install';
import {
	constructRootPackageName,
	isPotentiallyStandalone,
} from '@npm-smith/utils/packages';
import * as emoji from 'node-emoji';
import path from 'path';
import color from 'picocolors';
import {
	ROOT_DIR,
	TEMPLATES_DIR,
	copyTemplate,
	renderQuestions,
	renderTitle,
	updatePackageJson,
} from './utils';

async function main(): Promise<void> {
	renderTitle();

	// Load the renamed cache
	const renamedCache = loadRenamedCache(TEMPLATES_DIR);
	// Rename the templates
	!renamedCache && renameTemplates(TEMPLATES_DIR);

	const isStandalone = isPotentiallyStandalone();
	const project = await renderQuestions(isStandalone);
	const {
		initType,
		packageName,
		destination,
		isScoped,
		pkgManager,
		setupType,
	} = project;
	const parsedPackagePath = parseNameAndPath(packageName)[1];

	!isGitInitialized() && (await initializeGitRepo());

	const srcPath = path.join(TEMPLATES_DIR, initType);
	const dstPath = path.join(ROOT_DIR, destination, parsedPackagePath);

	createDir(dstPath);
	copyTemplate(srcPath, dstPath, initType, setupType); // copy templates to destination
	await updatePackageJson(dstPath, setupType); // merge and update package.json files
	replaceStringInFiles(dstPath, '{{initType}}', initType);
	replaceStringInFiles(
		dstPath,
		'{{packageName}}',
		constructRootPackageName(packageName, isScoped),
	);
	await install(pkgManager);

	p.outro(color.green(`${emoji.get('partying')} You're all set!`));
}

main().catch(console.error);
