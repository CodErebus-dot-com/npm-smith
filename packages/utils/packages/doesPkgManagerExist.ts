import { execute } from '../install';
import { PACKAGE_MANAGER } from '../types';

export const doesPkgManagerExist = (pkgManager: PACKAGE_MANAGER): boolean => {
	const output = execute('npm list -g').toString();
	return output.includes(pkgManager);
};
