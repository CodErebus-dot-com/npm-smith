import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const ROOT_DIR = process.cwd();
const __dirname = path.dirname(__filename);
const TEMPLATES_DIR =
	process.env.NODE_ENV === 'production'
		? path.join(__dirname, '..', '..', '..', '@npm-smith', 'templates')
		: path.join(__dirname, '..', 'templates');
const TEMPLATES_COMMON = path.join(TEMPLATES_DIR, 'common');
const TEMPLATES_ROOT = path.join(TEMPLATES_DIR, 'root');
const TEMPLATES_ROOT_STANDALONE = path.join(TEMPLATES_ROOT, 'standalone');
const TEMPLATES_ROOT_COMMON = path.join(TEMPLATES_ROOT, 'common');
const TEMPLATES_PACKAGE_JSON = path.join(TEMPLATES_DIR, 'packageJson');
const TEMPLATES_PACKAGE_JSON_STANDALONE = path.join(
	TEMPLATES_PACKAGE_JSON,
	'standalone',
);
const PACKAGE_JSON = path.join(ROOT_DIR, 'package.json');

export {
	PACKAGE_JSON,
	ROOT_DIR,
	TEMPLATES_COMMON,
	TEMPLATES_DIR,
	TEMPLATES_PACKAGE_JSON,
	TEMPLATES_PACKAGE_JSON_STANDALONE,
	TEMPLATES_ROOT,
	TEMPLATES_ROOT_COMMON,
	TEMPLATES_ROOT_STANDALONE,
	__dirname,
};
