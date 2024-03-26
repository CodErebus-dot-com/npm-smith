#!/usr/bin/env node
import * as p from '@clack/prompts'
import { FileUtils } from '@code-shaper/shaper-utils'
import { execTransformFiles } from '@npm-smith/utils/common'
import { initializeGitRepo, isGitInitialized } from '@npm-smith/utils/git'
import { install } from '@npm-smith/utils/install'
import { ROOT_DIR } from '@npm-smith/utils/path'
import * as emoji from 'node-emoji'
import path from 'path'
import color from 'picocolors'
import { TEMPLATES_DIR, presetOptions, renderTitle } from './utils/index.js'

async function main(): Promise<void> {
	renderTitle()

	const project = await p.group(
		{
			packageName: async () =>
				await p.text({
					message: 'What is going to be your package name?',
					initialValue: 'my-package',
					validate(value) {
						if (value.length === 0) return `Value is required!`
						return
					},
				}),
			initType: async () =>
				await p.select<
					{ value: string; label: string; hint: string }[],
					string
				>({
					message: 'What type of package do you want to create?',
					options: presetOptions,
				}),
		},
		{
			onCancel: () => {
				p.cancel(color.red(`${emoji.get('no_entry')} Operation cancelled`))
				process.exit(0)
			},
		},
	)

	const { initType } = project
	!isGitInitialized() && (await initializeGitRepo())

	const srcPath = path.join(TEMPLATES_DIR, initType)
	if (FileUtils.fileExists(srcPath)) {
		execTransformFiles(srcPath, ROOT_DIR)
	} else {
		return
	}

	// const newPackageJson = await fetchFromPackageJson(
	// 	(configType as string[]) || CONFIG_OPTIONS,
	// 	initType as string,
	// )
	// await updatePackageDependencies(newPackageJson as PackageJson.PackageJson[])
	await install()

	p.outro(color.green(`${emoji.get('partying')} You're all set!`))
}

main().catch(console.error)
