import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

type YamlData = {
	packages?: string[];
};

/**
 * @description : method to create a pnpm-workspace.yaml file
 */
const handlePnpmWorkspace = (): void => {
	const filePath = path.join(process.cwd(), 'pnpm-workspace.yaml');
	const sharedPackages = `packages/*`;
	const apps = `apps/*`;
	const data: YamlData = {
		packages: [sharedPackages, apps],
	};

	if (!fs.existsSync(filePath)) {
		fs.writeFileSync(filePath, yaml.dump(data));
	} else {
		let yamlData: YamlData | null = null;
		try {
			yamlData = yaml.load(fs.readFileSync(filePath, 'utf8')) as YamlData;
		} catch (error) {
			console.log('Error: ', error);
		}
		if (!yamlData) {
			yamlData = {};
		}

		if (!yamlData?.packages) {
			yamlData = { ...yamlData, ...data };
		} else {
			const packages = yamlData.packages ?? [];

			if (!packages.includes(sharedPackages)) {
				packages.push(sharedPackages);
			}
			if (!packages.includes(apps)) {
				packages.push(apps);
			}
			yamlData.packages = packages;
		}
		fs.writeFileSync(filePath, yaml.dump(yamlData));
	}
	return;
};

export { handlePnpmWorkspace };
