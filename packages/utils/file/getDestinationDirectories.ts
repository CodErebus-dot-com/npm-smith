import path from 'path';
import { isDirectory } from './dirOps';
import { traverseDirectory } from './traverseDirectory';

export const getDestinationDirectories = (
	rootDir: string,
	exclusions: string[] = [],
): string[] => {
	const directories: string[] = [];
	const defaultExclusions = ['node_modules', 'dist', 'build'];
	const allExclusions = [...defaultExclusions, ...exclusions];

	const collectDirectories = (filePath: string): void => {
		const baseName = path.basename(filePath);
		if (
			isDirectory(filePath) &&
			!allExclusions.includes(baseName) &&
			!baseName.startsWith('.')
		) {
			directories.push(filePath);
			traverseDirectory(filePath, collectDirectories);
		}
	};

	traverseDirectory(rootDir, collectDirectories);

	return directories;
};
