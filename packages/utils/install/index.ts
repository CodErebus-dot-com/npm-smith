import { exec } from 'child_process';
import sa from 'shell-artist';
import util from 'util';
import { PACKAGE_MANAGER } from '../types';

export const execute = util.promisify(exec);

export const install = async (
	pkgManager?: PACKAGE_MANAGER,
	directoryPath?: string,
): Promise<void> => {
	const spinner = sa.start('Installing dependencies...', {
		color: 'cyan',
		modifier: 'bold',
		emoji: 'rocket',
	});
	const { stderr } = await execute(`${pkgManager} install`, {
		cwd: directoryPath,
	});

	if (stderr) {
		sa.stop(spinner, 'Installation failed!', { emoji: 'fire' }, 'error');
		sa.log(stderr);
	} else {
		sa.stop(
			spinner,
			'Dependencies installed successfully',
			{
				modifier: 'bold',
				emoji: 'sparkles',
			},
			'success',
		);
	}
};
