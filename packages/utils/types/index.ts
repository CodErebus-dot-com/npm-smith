import { PACKAGE_LOCK, PNPM_LOCK, YARN_LOCK } from '../constants'

export type LOCK_FILE =
	| typeof PACKAGE_LOCK
	| typeof YARN_LOCK
	| typeof PNPM_LOCK
export type PACKAGE_MANAGER = 'yarn' | 'npm' | 'pnpm'
