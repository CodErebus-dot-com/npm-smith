import fs from 'fs-extra';
import path from 'path';
import { isDirectory } from './dirOps';

export const traverseDirectory = (
	currentDirOrFile: string,
	fileOperation?: (filePath: string) => void,
	dirOperation?: (dirPath: string) => void,
	iteration: 'single' | 'recursive' = 'recursive',
): void => {
	const dirContent = fs.readdirSync(currentDirOrFile);

	dirContent.forEach(item => {
		const itemPath = path.join(currentDirOrFile, item);

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
