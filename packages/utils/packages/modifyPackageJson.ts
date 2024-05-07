import PackageJson from '@npmcli/package-json';
import path from 'path';
import { execute } from '../install';

export const addObjectToPackageJson = async (
	property: string,
	dataSource: PackageJson.Content,
	packageJsonPath: string,
): Promise<void> => {
	try {
		const pkg = await PackageJson.load(path.dirname(packageJsonPath));
		const updateData: PackageJson.Content = {};

		if (
			pkg.content[property] &&
			typeof pkg.content[property] === 'object' &&
			!Array.isArray(pkg.content[property])
		) {
			updateData[property] = {
				...(pkg.content[property] as object),
				...dataSource,
			};
		} else {
			updateData[property] = dataSource;
		}

		pkg.update(updateData);

		await pkg.save();
	} catch (error) {
		console.error('Failed to modify package.json:', error);
	}
};

export const addKeyToPackageJson = async (
	key: string,
	value: string[] | string,
	packageJsonPath: string,
): Promise<void> => {
	try {
		const pkg = await PackageJson.load(path.dirname(packageJsonPath));

		let existingValues = pkg.content[key];
		if (!Array.isArray(existingValues)) {
			existingValues = [];
		}

		const newValues = Array.isArray(value) ? value : [value];
		const combinedValues = [...new Set([...existingValues, ...newValues])];

		pkg.content[key] = combinedValues;

		pkg.update({ [key]: combinedValues });
		await pkg.save();
	} catch (error) {
		console.error('Failed to update package.json:', error);
	}
};

export const sortPackageJson = (dstPath: string = process.cwd()): void => {
	execute('npx sort-package-json', { cwd: dstPath });
};
