import type { Options } from 'tsup'

export const tsup: Options = {
	clean: true,
	dts: true,
	minify: true,
	bundle: true,
	skipNodeModulesBundle: true,
	format: ['cjs', 'esm'],
	entry: {
		index: '{{folderType}}/index.ts',
	},
	outDir: 'dist',
	target: 'es2020',
	treeshake: true,
	splitting: true,
}
