import fs from 'fs'

/**
 * @description : method to check if directory is empty or not
 * @param {string} directoryPath : location of directory
 * @returns {boolean} true if empty else false
 */
export const isEmptyDir = (directoryPath?: string): boolean => {
	try {
		const files = fs.readdirSync(directoryPath ?? process.cwd())
		return files.length === 0
	} catch (e) {
		return false
	}
}
