import fs from 'fs-extra';
import path from 'path';
import { isDirectory } from './dirOps';

export const traverseDirectory = (
	fileOrFolderPath: string,
	fileOperation?: (filePath: string) => void,
	dirOperation?: (dirPath: string) => void,
	iteration: 'single' | 'recursive' = 'recursive',
): void => {
	const dirContent = fs.readdirSync(fileOrFolderPath);

	dirContent.forEach(item => {
		const itemPath = path.join(fileOrFolderPath, item);

		if (isDirectory(itemPath)) {
			dirOperation && dirOperation(itemPath);

			if (iteration === 'recursive') {
				traverseDirectory(itemPath, fileOperation, dirOperation, iteration);
			}
		} else if (fileOperation) {
			fileOperation(itemPath);
		}
	});
};
