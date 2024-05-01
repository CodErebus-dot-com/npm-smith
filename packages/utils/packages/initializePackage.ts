import { execute } from '../install';
import { PACKAGE_MANAGER } from '../types';
import { doesPkgManagerExist } from './doesPkgManagerExist';

export const initializePackage = async (
	pkgManager: PACKAGE_MANAGER,
	dstDir?: string,
): Promise<void> => {
	const execOptions = dstDir ? { cwd: dstDir } : {};
	switch (pkgManager) {
		case 'yarn':
			await execute(
				`${doesPkgManagerExist(pkgManager) ? 'yarn init -yp' : 'npm i -g yarn && yarn init -yp'}`,
				execOptions,
			);
			break;
		case 'pnpm':
			await execute(
				`${doesPkgManagerExist(pkgManager) ? 'pnpm init' : 'npm i -g pnpm && pnpm init'}`,
				execOptions,
			);
			break;
		default:
			await execute(`npm init -y`, execOptions);
	}
};
