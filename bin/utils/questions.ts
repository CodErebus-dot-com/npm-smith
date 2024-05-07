import * as p from '@clack/prompts';
import { validate } from '@npm-smith/utils/common';
import { getDestinationDirectories } from '@npm-smith/utils/file';
import { identifyPackageManager } from '@npm-smith/utils/packages';
import * as emoji from 'node-emoji';
import color from 'picocolors';
import {
	DestinationOption,
	INIT_TYPE,
	PACKAGE_MANAGER,
	PkgManagerOption,
	PresetOption,
	QUESTIONS,
	SETUP_TYPE,
	SetupOption,
} from '../types';

function createPresetOptions<T extends PresetOption>(options: T[]): T[] {
	return options;
}

function createPkgManagerOptions<T extends PkgManagerOption>(
	options: T[],
): T[] {
	return options;
}

function createSetupOptions<T extends SetupOption>(options: T[]): T[] {
	return options;
}

function createDestinationOptions<T extends DestinationOption>(
	options: T[],
): T[] {
	return options;
}

export const presetOptions = createPresetOptions([
	{
		value: 'cli',
		label: 'Command Line Interface',
		hint: 'to create beautiful cli tools or code generators',
	},
	{
		value: 'lib',
		label: 'Library Package',
		hint: 'to create libraries, utilities or shared packages',
	},
	{
		value: '2in1',
		label: '2 In One',
		hint: 'to create executable cli and installable library at the same time',
	},
]);

export const pkgManagerOptions = createPkgManagerOptions([
	{
		value: 'yarn',
		label: 'yarn',
		hint: 'recommended',
	},
	{
		value: 'npm',
		label: 'npm',
		hint: '',
	},
	{
		value: 'pnpm',
		label: 'pnpm',
		hint: 'recommended',
	},
]);

export const setupOptions = createSetupOptions([
	{
		value: 'integrated',
		label: 'Integrated',
		hint: 'comes with only the necessary development configuration',
	},
	{
		value: 'standalone',
		label: 'Standalone',
		hint: `comes with the complete setup provided by universal-devkit's express setup ${color.cyan('https://www.npmjs.com/package/universal-devkit#express-setup')}`,
	},
]);

const destinationDirectories = getDestinationDirectories(
	undefined,
	undefined,
	'single',
);

export const destinationOptions = createDestinationOptions(
	destinationDirectories.map((directory: string) => ({
		value: directory,
		label: directory,
		hint: '',
	})),
);

export const renderQuestions = async (
	isStandalone: boolean,
): Promise<QUESTIONS> => {
	return await p.group(
		{
			isScoped: async () =>
				(await p.confirm({
					message:
						'Is this going to be a scoped package? (visit https://docs.npmjs.com/cli/v10/using-npm/scope for more info)',
					initialValue: true,
				})) as boolean,
			initType: async () =>
				(await p.select<PresetOption[], string>({
					message: 'What type of npm package do you want to create?',
					options: presetOptions,
				})) as INIT_TYPE,
			destination: async () =>
				!isStandalone && destinationDirectories.length
					? ((await p.select({
							message: 'Where do you want to create the new package?',
							options: destinationOptions,
						})) as string)
					: '',
			packageName: async ({ results }: { results: Partial<QUESTIONS> }) =>
				await p.text({
					message: 'What is going to be your package name?',
					initialValue: results.isScoped ? '@my-org/my-package' : 'my-package',
					validate,
				}),
			setupType: async () =>
				(await p.select<SetupOption[], string>({
					message:
						'Is this package being set up as part of an integrated or as a standalone project?',
					options: setupOptions,
				})) as SETUP_TYPE,
			pkgManager: async () =>
				identifyPackageManager() ??
				((await p.select<PkgManagerOption[], string>({
					message: 'Choose your favorite package manager',
					options: pkgManagerOptions,
				})) as PACKAGE_MANAGER),
		},
		{
			onCancel: () => {
				p.cancel(color.red(`${emoji.get('no_entry')} Operation cancelled`));
				process.exit(0);
			},
		},
	);
};
