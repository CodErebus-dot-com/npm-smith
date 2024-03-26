import { FileUtils } from '@code-shaper/shaper-utils'
const { transformFiles } = FileUtils

export const execTransformFiles = (src: string, dst: string): void => {
	const ogConsole = console.log

	console.log = () => {}
	transformFiles(src, dst, {})
	console.log() // empty log
	console.log = ogConsole
}
