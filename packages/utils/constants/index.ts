export const PACKAGE_LOCK = 'package-lock.json'

export const YARN_LOCK = 'yarn.lock'

export const PNPM_LOCK = 'pnpm-lock.yaml'

export const PACKAGE_MANAGER_MAP = {
	PACKAGE_LOCK: 'npm',
	YARN_LOCK: 'yarn',
	PNPM_LOCK: 'pnpm',
} as const
