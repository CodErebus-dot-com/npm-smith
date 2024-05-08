import fs from 'fs-extra';
import { traverseDirectory } from './traverseDirectory';

export const replaceStringInFiles = (
	fileOrFolderPath: string,
	regexStr: string | RegExp,
	replacedStr: string,
): void => {
	const regex = new RegExp(regexStr, 'g');

	const replaceString = (filePath: string): void => {
		let content = fs.readFileSync(filePath, 'utf-8');
		content = content.replaceAll(regex, replacedStr);
		fs.writeFileSync(filePath, content, 'utf-8');
	};

	traverseDirectory(fileOrFolderPath, replaceString);
};
