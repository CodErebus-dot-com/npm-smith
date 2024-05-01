import { FileUtils } from '@code-shaper/shaper-utils';
// import fs from 'fs-extra'
// import path from 'path'
// import { traverseDirectory } from '../file/traverseDirectory'

const { transformFiles } = FileUtils;

export const execTransformFiles = (src: string, dst: string): void => {
	const ogConsole = console.log;

	console.log = () => {};
	transformFiles(src, dst, {});

	// const renameTmpFiles = (filePath: string): void => {
	// 	if (filePath.endsWith('__tmp__')) {
	// 		const newFilePath = filePath.replace(/__tmp__$/, '')
	// 		fs.renameSync(filePath, newFilePath)
	// 	}
	// }
	// const templatesDir = path.join(dst, 'templates')
	// traverseDirectory(templatesDir, renameTmpFiles)

	console.log(); // empty log
	console.log = ogConsole;
};
