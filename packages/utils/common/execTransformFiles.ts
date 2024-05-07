import { FileUtils } from '@code-shaper/shaper-utils';
import fs from 'fs-extra';
import path from 'path';
import { traverseDirectory } from '../file/traverseDirectory';

const { transformFiles } = FileUtils;

export const execTransformFiles = (
	src: string,
	dst: string,
	additionalEndsWith?: string[],
): void => {
	const ogConsole = console.log;

	console.log = () => {};
	transformFiles(src, dst, {});

	if (additionalEndsWith && additionalEndsWith.length > 0) {
		const renameTmpFiles = (filePath: string): void => {
			additionalEndsWith.forEach(suffix => {
				if (filePath.endsWith(suffix)) {
					const newFilePath = filePath.replace(new RegExp(suffix + '$'), '');
					fs.renameSync(filePath, newFilePath);
				}
			});
		};

		const templatesDir = path.join(dst, 'templates');
		traverseDirectory(templatesDir, renameTmpFiles);
	}

	console.log(); // empty log
	console.log = ogConsole;
};
