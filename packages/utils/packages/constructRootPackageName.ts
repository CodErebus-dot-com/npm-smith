/**
 * @description : method to construct package's name
 * @param {string} packageName : name of the package
 * @param {string} scopeName: name of the scope/organization
 * @param {boolean} isScoped: scoped package or not
 */
export const constructRootPackageName = (
	packageName: string,
	isScoped: boolean,
	scopeName?: string,
): string => {
	if (isScoped && scopeName) {
		if (scopeName.startsWith('@')) {
			return scopeName + '/' + packageName;
		}
		return '@' + scopeName + '/' + packageName;
	} else if (isScoped) {
		if (packageName.startsWith('@') && packageName.includes('/')) {
			return packageName;
		}
		throw Error('Incorrect input provided');
	}
	return packageName;
};
