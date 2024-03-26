import { exec } from 'child_process'
import sa from 'shell-artist'
import util from 'util'
import { identifyPackageManager } from '../packages'

export const execute = util.promisify(exec)

export const install = async (): Promise<void> => {
	const pkgManager = identifyPackageManager()
	const spinner = sa.start('Installing dependencies...', {
		color: 'cyan',
		modifier: 'bold',
		emoji: 'rocket',
	})
	const { stderr } = await execute(`${pkgManager} install`)

	if (stderr) {
		sa.stop(spinner, 'Installation failed!', { emoji: 'fire' }, 'error')
		sa.log(stderr)
	} else {
		sa.stop(
			spinner,
			'Dependencies installed successfully',
			{
				modifier: 'bold',
				emoji: 'sparkles',
			},
			'success',
		)
	}
}
