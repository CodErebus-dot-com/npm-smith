import type { Options } from 'tsup'

export const tsup: Options = {
	clean: true,
	dts: true,
	minify: true,
	bundle: true,
	skipNodeModulesBundle: true,
	format: ['cjs', 'esm'],
	entry: {
		'file/index': 'file/index.ts',
		'git/index': 'git/index.ts',
		'common/index': 'common/index.ts',
		'install/index': 'install/index.ts',
		'packages/index': 'packages/index.ts',
		'path/index': 'path/index.ts',
	},
	outDir: 'dist',
	target: 'es2020',
	treeshake: true,
	splitting: true,
}
