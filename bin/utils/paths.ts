import { __dirname, ROOT_DIR } from '@npm-smith/utils/path';
import path from 'path';

export const TEMPLATES_DIR = path.join(
	__dirname,
	'..',
	'..',
	'..',
	'@npm-smith',
	'templates',
);
export const TEMPLATES_COMMON = path.join(TEMPLATES_DIR, 'common');
export const TEMPLATES_ROOT = path.join(TEMPLATES_DIR, 'root');
export const TEMPLATES_ROOT_STANDALONE = path.join(
	TEMPLATES_ROOT,
	'standalone',
);
export const TEMPLATES_ROOT_COMMON = path.join(TEMPLATES_ROOT, 'common');
export const TEMPLATES_PACKAGE_JSON = path.join(TEMPLATES_DIR, 'packageJson');
export const PACKAGE_JSON = path.join(ROOT_DIR, 'package.json');
