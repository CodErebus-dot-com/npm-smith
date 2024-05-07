import path from 'path';
import { handlePnpmWorkspace } from './handlePnpmWorkspace';
import { identifyPackageManager } from './identifyPackageManager';
import { addKeyToPackageJson } from './modifyPackageJson';

/**
 * @description : method to create and handle workspaces for 'npm', 'yarn' and 'pnpm'
 */
const handleWorkspaces = async (): Promise<void> => {
	if (identifyPackageManager() === 'pnpm') handlePnpmWorkspace();

	const filePath = path.join(process.cwd(), 'package.json');
	const appsDir = 'apps/*';
	const packagesDir = 'packages/*';

	try {
		await addKeyToPackageJson('workspaces', [appsDir, packagesDir], filePath);
	} catch (error) {
		console.error('Failed to update package.json workspaces:', error);
	}
};

export { handleWorkspaces };
