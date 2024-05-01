import fs from 'fs-extra';
import path from 'path';
import { isDirectory } from './dirOps';

export const traverseDirectory = (
	currentDirOrFile: string,
	fileOperation: (filePath: string) => void,
): void => {
	if (isDirectory(currentDirOrFile)) {
		fs.readdirSync(currentDirOrFile).forEach(file => {
			const filePath = path.join(currentDirOrFile, file);
			if (!isDirectory(currentDirOrFile)) {
				fileOperation(filePath);
			} else if (isDirectory(currentDirOrFile)) {
				traverseDirectory(filePath, fileOperation);
			}
		});
	} else {
		fileOperation(currentDirOrFile);
	}
};
