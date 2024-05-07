import fs from 'fs';
import path from 'path';
import { renameSync } from './dirOps';
import { traverseDirectory } from './traverseDirectory';

const RENAMING_CACHE_FILE = 'renamedCache.json'; // Name of the cache file
const renamingCacheFilePath = (TEMPLATES_DIR: string): string =>
	path.join(TEMPLATES_DIR, RENAMING_CACHE_FILE);

let renamedCache = false;

/**
 * @description : method to load the cache file
 * @param {string} templatesPath : path to the templates directory
 * @returns {boolean} Returns true if the cache file exists and renaming is done
 */
const loadRenamedCache = (templatesPath: string): boolean => {
	try {
		const data = fs.readFileSync(renamingCacheFilePath(templatesPath), 'utf8');
		renamedCache = JSON.parse(data);
	} catch (err) {
		// If cache file doesn't exist, it's fine, we'll create it later
	}
	return renamedCache;
};

/**
 * @description : method to save the cache file
 * @param {string} templatesPath : path to the templates directory
 */
const saveRenamedCache = (templatesPath: string): void => {
	const data = JSON.stringify(renamedCache);
	fs.writeFileSync(renamingCacheFilePath(templatesPath), data);
};

/**
 * @description : method to rename the files present in templates directory
 * @param {string} templatesPath : path to the templates directory
 * @param {string[]} additionalEndsWith : array of strings in the filename to be removed, always includes '.ejs.ts'
 */
const renameTemplates = (
	templatesPath: string,
	additionalEndsWith: string[] = [],
): void => {
	const allEndsWith = ['.ejs.t', ...additionalEndsWith];
	const renameFile = (filePath: string): void => {
		allEndsWith.forEach(suffix => {
			if (filePath.endsWith(suffix)) {
				const newFilePath = filePath.replace(new RegExp(suffix + '$'), '');
				renameSync(filePath, newFilePath);
			}
		});
	};
	traverseDirectory(templatesPath, renameFile);

	renamedCache = true;
	saveRenamedCache(templatesPath);
};

export { loadRenamedCache, renameTemplates };
