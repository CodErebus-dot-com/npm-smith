import { FileUtils } from '@code-shaper/shaper-utils'
import path from 'path'
import {
	PACKAGE_LOCK,
	PACKAGE_MANAGER_MAP,
	PNPM_LOCK,
	YARN_LOCK,
} from '../constants'
import { ROOT_DIR } from '../path'
import { PACKAGE_MANAGER } from '../types'

export const identifyPackageManager = (): PACKAGE_MANAGER => {
	const packageLock = path.join(ROOT_DIR, PACKAGE_LOCK)
	const pnpmLock = path.join(ROOT_DIR, PNPM_LOCK)
	const yarnLock = path.join(ROOT_DIR, YARN_LOCK)
	const { fileExists } = FileUtils

	if (fileExists(yarnLock)) {
		return PACKAGE_MANAGER_MAP.YARN_LOCK
	}
	if (fileExists(pnpmLock)) {
		return PACKAGE_MANAGER_MAP.PNPM_LOCK
	}
	if (fileExists(packageLock)) {
		return PACKAGE_MANAGER_MAP.PACKAGE_LOCK
	}
	return PACKAGE_MANAGER_MAP.PACKAGE_LOCK
}
