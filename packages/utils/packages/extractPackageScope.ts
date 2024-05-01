export function extractPackageScope(libraryName: string): string | null {
	const scopedPattern = /^(@[a-zA-Z0-9-]+)\/[a-zA-Z0-9-]+$/;
	const match = libraryName.match(scopedPattern);
	return match ? match[1] : null;
}
