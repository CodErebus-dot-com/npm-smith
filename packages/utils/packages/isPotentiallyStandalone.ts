import fs from 'fs-extra';
import path from 'path';

/**
 * @description: function to check if the current working directory is suitable for creating a new standalone project
 * @param {string} directoryPath: path to the current working directory
 */
export const isPotentiallyStandalone = (
	directoryPath: string = process.cwd(),
): boolean => {
	const projectIndicators = [
		'package.json',
		'.git',
		'.gitignore',
		'README.md',
		'node_modules',
	];

	return !projectIndicators.some(indicator =>
		fs.existsSync(path.join(directoryPath, indicator)),
	);
};
