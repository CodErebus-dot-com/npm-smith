import { execTransformFiles } from '@npm-smith/utils/common';
import { renameSync, traverseDirectory } from '@npm-smith/utils/file';
import { execute } from '@npm-smith/utils/install';
import PackageJson from '@npmcli/package-json';
import fs from 'fs-extra';
import _ from 'lodash';
import path from 'path';
import { INIT_TYPE, SETUP_TYPE } from '../types';
import {
	TEMPLATES_COMMON,
	TEMPLATES_DIR,
	TEMPLATES_PACKAGE_JSON,
	TEMPLATES_PACKAGE_JSON_STANDALONE,
	TEMPLATES_ROOT_COMMON,
	TEMPLATES_ROOT_STANDALONE,
} from './paths';

const copyTemplate = (
	srcPath: string,
	dstPath: string,
	initType: INIT_TYPE,
	setupType: SETUP_TYPE,
): void => {
	execTransformFiles(srcPath, dstPath);
	execTransformFiles(
		TEMPLATES_COMMON,
		path.join(dstPath, initType === 'cli' ? 'bin' : 'src'),
	);
	setupType === 'standalone' &&
		execTransformFiles(TEMPLATES_ROOT_STANDALONE, dstPath);
	execTransformFiles(TEMPLATES_ROOT_COMMON, dstPath);
	execTransformFiles(path.join(TEMPLATES_PACKAGE_JSON, initType), dstPath);
};

const createPackageJson = async (
	packageName: string,
	dstPath: string,
	setupType: SETUP_TYPE,
): Promise<void> => {
	const commonPackageJson = await PackageJson.load(TEMPLATES_PACKAGE_JSON);
	const packageJson = await PackageJson.load(packageName);
	let mergedContent: PackageJson.Content = {};

	if (setupType === 'standalone') {
		const standalonePackageJson = await PackageJson.load(
			TEMPLATES_PACKAGE_JSON_STANDALONE,
		);
		mergedContent = _.merge(
			commonPackageJson.content,
			standalonePackageJson.content,
			packageJson.content,
		);
	}
	mergedContent = _.merge(commonPackageJson.content, packageJson.content);

	packageJson.update(mergedContent);
	await packageJson.save();
	execute('npx sort-package-json', { cwd: dstPath });
};

const RENAMING_CACHE_FILE = 'renamedCache.json'; // Name of the cache file
const renamingCacheFilePath = path.join(TEMPLATES_DIR, RENAMING_CACHE_FILE);

let renamedCache = false;

/**
 * @description : method to load the cache file
 * @returns {boolean} Returns true if the cache file exists and renaming is done
 */
const loadRenamedCache = (): boolean => {
	try {
		const data = fs.readFileSync(renamingCacheFilePath, 'utf8');
		renamedCache = JSON.parse(data);
	} catch (err) {
		// If cache file doesn't exist, it's fine, we'll create it later
	}
	return renamedCache;
};

/**
 * @description : method to save the cache file
 */
const saveRenamedCache = (): void => {
	const data = JSON.stringify(renamedCache);
	fs.writeFileSync(renamingCacheFilePath, data);
};

/**
 * @description : method to rename the files present in templates directory
 * @param {string} sourcePath : path to the templates directory
 */
const renameTemplates = (sourcePath: string): void => {
	const renameFile = (filePath: string): void => {
		if (filePath?.endsWith('.ejs.t')) {
			const newFilePath = filePath.replace('.ejs.t', '');
			renameSync(filePath, newFilePath);
		}
	};
	traverseDirectory(sourcePath, renameFile);

	renamedCache = true;
	saveRenamedCache();
};

export { copyTemplate, createPackageJson, loadRenamedCache, renameTemplates };
