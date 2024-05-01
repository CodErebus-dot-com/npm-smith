#!/usr/bin/env node
import * as p from '@clack/prompts';
import { replaceStringInFiles } from '@npm-smith/utils/file';
import { initializeGitRepo, isGitInitialized } from '@npm-smith/utils/git';
import { install } from '@npm-smith/utils/install';
import { ROOT_DIR } from '@npm-smith/utils/path';
import * as emoji from 'node-emoji';
import path from 'path';
import color from 'picocolors';

import { parseNameAndPath } from '@npm-smith/utils/common';
import {
	TEMPLATES_DIR,
	copyTemplate,
	createPackageJson,
	loadRenamedCache,
	renameTemplates,
	renderQuestions,
	renderTitle,
} from './utils';

async function main(): Promise<void> {
	renderTitle();

	// Load the renamed cache
	const renamedCache = loadRenamedCache();
	// Rename the templates
	!renamedCache && renameTemplates(TEMPLATES_DIR);

	const project = await renderQuestions();
	const { initType, packageName, pkgManager, setupType } = project;
	const parsedPackageName = parseNameAndPath(packageName)[0];

	!isGitInitialized() && (await initializeGitRepo());

	const srcPath = path.join(TEMPLATES_DIR, initType);
	const dstPath = path.join(ROOT_DIR, parsedPackageName);

	copyTemplate(srcPath, dstPath, initType, setupType); // copy templates to destination
	await createPackageJson(parsedPackageName, dstPath); // merge and update package.json files
	replaceStringInFiles(dstPath, '{{initType}}', initType);
	replaceStringInFiles(dstPath, '{{packageName}}', parsedPackageName);

	await install(pkgManager, dstPath);

	p.outro(color.green(`${emoji.get('partying')} You're all set!`));
}

main().catch(console.error);
