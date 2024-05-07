import fs from 'fs-extra';
import color from 'picocolors';

/**
 * @description : method to check if directory is empty or not
 * @param {string} directoryPath : location of directory
 * @returns {boolean} true if empty else false
 */
function isEmptyDir(directoryPath?: string): boolean {
	try {
		const files = fs.readdirSync(directoryPath ?? process.cwd());
		return files.length === 0;
	} catch (e) {
		return false;
	}
}

/**
 * @description : method to check if given path is directory or not
 * @param {string} path : path of file or directory
 * @returns {boolean} true if directory else false
 */
function isDirectory(path: string): boolean {
	if (fs.existsSync(path)) {
		return fs.statSync(path).isDirectory();
	}
	return false;
}

/**
 * @description : method to rename directory or filename.
 * @param {string} currPath : current directory or filename
 * @param {string} newPath : new directory or filename
 */
function renameSync(currPath: string, newPath: string): void {
	try {
		fs.renameSync(currPath, newPath);
	} catch (e) {
		console.error(color.red(`${e}: Failed renmaing process.`));
		throw e;
	}
}

/**
 * @description : method to remove folder
 * @param {string} dirPath : folder name
 */
function removeDir(dirPath: string): void {
	try {
		fs.rmSync(dirPath, { recursive: true, force: true });
	} catch (e) {
		console.error(color.red('error removing directory'));
		throw e;
	}
}

/**
 * @description : method to remove file
 * @param {string} filePath : file path
 */
function deleteFile(filePath: string): void {
	try {
		fs.unlinkSync(filePath);
	} catch (e) {
		console.error(color.red('error removing file'));
		throw e;
	}
}

/**
 * @description : method to create folder name
 * @param {string} dir : folder name
 */
function createDir(dir: string): void {
	try {
		fs.mkdirSync(dir);
	} catch (e) {
		console.error(color.red('error creating directory'));
		throw e;
	}
}

export {
	createDir,
	deleteFile,
	isDirectory,
	isEmptyDir,
	removeDir,
	renameSync,
};
