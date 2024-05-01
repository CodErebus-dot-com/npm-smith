import { extractPackageScope } from './extractPackageScope';

export function getNewPackageName(
	packageName: string,
	libraryName: string,
): string {
	const extractedScope = extractPackageScope(libraryName);
	return extractedScope
		? // ? prefix
			// 	? `${extractedScope}/${prefix}-${packageName}`
			`${extractedScope}/${packageName}`
		: `${libraryName}-${packageName}`;
}
