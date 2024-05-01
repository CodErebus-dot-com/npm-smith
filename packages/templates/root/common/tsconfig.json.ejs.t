{
	"compilerOptions": {
		"rootDir": "{{initType}}",
		"outDir": "dist",
		"baseUrl": "./",
		"paths": {},
		"types": ["node"],
		"moduleResolution": "Bundler",
		"module": "ESNext",
		"forceConsistentCasingInFileNames": true,
		"skipLibCheck": true,
		"allowJs": true,
		"declaration": true,
		"esModuleInterop": true,
		"strict": true,
		"noUnusedLocals": true,
		"noUnusedParameters": true,
		"noFallthroughCasesInSwitch": true,
		"noImplicitAny": true,
		"allowUnreachableCode": false,
		"strictNullChecks": true,
		"strictFunctionTypes": true,
		"useUnknownInCatchVariables": false,
		"alwaysStrict": true,
		"noImplicitReturns": true
	},
	"include": ["{{initType}}"],
	"exclude": ["**/node_modules"]
}
