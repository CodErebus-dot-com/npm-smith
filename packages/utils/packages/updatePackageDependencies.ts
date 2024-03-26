//@ts-nocheck
import { spinner } from '@clack/prompts'
import PackageJson from '@npmcli/package-json'
import * as emoji from 'node-emoji'

const s = spinner()

export const getLatestVersion = async (dep: string): Promise<string> => {
	const response = await fetch(`https://registry.npmjs.org/${dep}`)
	const data = await response.json()
	const latestVersion = data['dist-tags'].latest
	return latestVersion
}

export const updatePackageDependencies = async (
	newPackageJson: PackageJson.PackageJson[],
): Promise<void> => {
	try {
		const packageJson = await PackageJson.load('./')
		const packageContent = packageJson.content
		const latestVersionsPromises: Promise<void>[] = []

		const newPackageContent = newPackageJson.reduce((merged, pkg) => {
			Object.keys(pkg).forEach(key => {
				if (Object.prototype.hasOwnProperty.call(pkg, key)) {
					if (
						merged[key] &&
						typeof merged[key] === 'object' &&
						!Array.isArray(merged[key])
					) {
						merged[key] = { ...merged[key], ...pkg[key] }
					} else {
						merged[key] = pkg[key]
					}
				}

				if (key === 'devDependencies' && typeof pkg[key] === 'object') {
					const depKeys = Object.keys(pkg[key] as object)
					for (const dep of depKeys) {
						if ((pkg[key] as PackageJson.PackageJson)[dep] === '{latest}') {
							latestVersionsPromises.push(
								getLatestVersion(dep).then(latestVersion => {
									if (merged[key]) {
										(merged[key] as PackageJson.PackageJson)[dep] =
											latestVersion
									} else {
										merged[key] = { [dep]: latestVersion }
									}
								}),
							)
						}
					}
				}
			})
			return merged
		}, {})

		await Promise.all(latestVersionsPromises)

		const updatedPackageJson = { ...packageContent }

		Object.keys(newPackageContent).forEach(key => {
			if (
				updatedPackageJson[key] &&
				typeof updatedPackageJson[key] === 'object'
			) {
				updatedPackageJson[key] = {
					...updatedPackageJson[key],
					...newPackageContent[key],
				}
			} else {
				updatedPackageJson[key] = newPackageContent[key]
			}
		})

		packageJson.update(updatedPackageJson)
		await packageJson.save()
		s.stop(`${emoji.get('memo')} Updated the package.json`)
	} catch (error) {
		console.error(error)
	}
}
