// import { PACKAGE_JSON_DIR } from './paths.js'

// const s = spinner()

// export const fetchFromPackageJson = async (
// 	configOptions: string[],
// 	initType: string,
// ): Promise<unknown[]> => {
// 	s.start(
// 		`${emoji.get('rocket')} Getting the necessary dependencies and scripts...`,
// 	)
// 	const newPackageJson: PackageJson.PackageJson[][] = await Promise.all(
// 		configOptions.map(async config => {
// 			const srcPackageJsonPath =
// 				process.platform === 'win32'
// 					? `file://${path.join(
// 							PACKAGE_JSON_DIR,
// 							initType,
// 							initType === 'custom' ? config : '',
// 							'index.js',
// 						)}`
// 					: path.join(
// 							PACKAGE_JSON_DIR,
// 							initType,
// 							initType === 'custom' ? config : '',
// 							'index.js',
// 						)
// 			const srcPackageJsonModule = await import(srcPackageJsonPath)
// 			return srcPackageJsonModule.packageJson
// 		}),
// 	)

// 	return newPackageJson.flat()
// }
