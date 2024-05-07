import path from 'path';
import { traverseDirectory } from './traverseDirectory';

/**
 * @description : function that returns a list of directories present inside a provided path
 * @param {string} rootDir : current working directory or the path
 * @param {string[]} exclusions : an array of directory names to exclude from the list
 * @param {'single' | 'recursive'} iteration : a flag that controls the recursive nature of the function. 'single' means looks at only the top level and 'recursive' means goes into all the subdirectories
 */
export const getDestinationDirectories = (
	exclusions: string[] = [],
	rootDir: string = process.cwd(),
	iteration?: 'single' | 'recursive',
): string[] => {
	const directories: string[] = [];
	const defaultExclusions = ['node_modules', '.git', 'dist', 'build'];
	const allExclusions = [...defaultExclusions, ...exclusions];

	const collectDirectories = (filePath: string): void => {
		const dirName = path.basename(filePath);
		if (!allExclusions.includes(dirName) && !dirName.startsWith('.')) {
			directories.push(dirName);
		}
	};

	traverseDirectory(rootDir, undefined, collectDirectories, iteration);
	return directories;
};
