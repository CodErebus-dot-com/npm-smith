import { presetOptions } from '../utils';

// type PRESET_OPTION = (typeof presetOptions)[number]
export interface PresetOption {
	value: INIT_TYPE;
	label: string;
	hint: string;
}

export interface PkgManagerOption {
	value: PACKAGE_MANAGER;
	label: PACKAGE_MANAGER;
	hint: string;
}

export interface SetupOption {
	value: SETUP_TYPE;
	label: UppercaseSetupType;
	hint: string;
}

export interface DestinationOption {
	value: string;
	label: string;
	hint: string;
}

export interface QUESTIONS {
	isScoped: boolean;
	packageName: string;
	destination: string;
	initType: INIT_TYPE;
	pkgManager: PACKAGE_MANAGER;
	setupType: SETUP_TYPE;
}

// export type PRESETS = PRESET_OPTION['value']
type PresetValues<T> = T extends { value: infer U }[] ? U : never;
export type PRESETS = PresetValues<typeof presetOptions>;

export type INIT_TYPE = 'cli' | 'lib' | '2in1';

export type PACKAGE_MANAGER = 'yarn' | 'npm' | 'pnpm';

export type SETUP_TYPE = 'integrated' | 'standalone';
type UppercaseSetupType = Capitalize<SETUP_TYPE>;
