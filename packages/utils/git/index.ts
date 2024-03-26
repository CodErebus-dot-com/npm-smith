import fs from 'fs'
import path from 'path'
import sa from 'shell-artist'
import { execute } from '../install'

/**
 * @description : method to check if git initialized or not
 * @returns {boolean} true if git is initialized else false
 */
export const isGitInitialized = (): boolean => {
	try {
		const gitDir = path.join(process.cwd(), '.git')
		return fs.statSync(gitDir).isDirectory()
	} catch (e) {
		return false
	}
}

/**
 * @description : method to initiate git repository
 */
export const initializeGitRepo = async (): Promise<void> => {
	const { stderr, stdout } = await execute('git init')

	if (stderr) {
		sa.error(`Error: Failed to intialized git repo. ${stderr}`)
		process.exit(1)
	}
	if (stdout) {
		sa.success(stdout, {
			emoji: 'heavy_check_mark',
		})
	}
}
