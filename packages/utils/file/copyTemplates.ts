import { FileUtils } from '@code-shaper/shaper-utils';
import fs from 'fs-extra';
import { traverseDirectory } from './traverseDirectory';

const { transformFiles } = FileUtils;

export const copyTemplates = (
	srcPath: string,
	dstPath: string,
	additionalEndsWith?: string[],
): void => {
	const ogConsole = console.log;

	console.log = () => {};
	transformFiles(srcPath, dstPath, {});

	if (additionalEndsWith && additionalEndsWith.length > 0) {
		const renameTmpFiles = (filePath: string): void => {
			additionalEndsWith.forEach(suffix => {
				if (filePath.endsWith(suffix)) {
					const newFilePath = filePath.replace(new RegExp(suffix + '$'), '');
					fs.renameSync(filePath, newFilePath);
				}
			});
		};

		traverseDirectory(dstPath, renameTmpFiles);
	}

	console.log(); // empty log
	console.log = ogConsole;
};
