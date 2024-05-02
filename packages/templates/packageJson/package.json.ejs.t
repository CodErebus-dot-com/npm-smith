{
	"name": "{{packageName}}",
	"version": "1.0.0",
	"description": "My npm package",
	"type": "module",
	"files": ["README.md", "package.json"],
	"publishConfig": {
		"access": "public",
		"registry": "https://registry.npmjs.org/"
	},
	"scripts": {
		"bump": "bump"
	},
	"keywords": ["npm", "package", "module"],
	"license": "MIT",
	"dependencies": {
		"@npmcli/package-json": "^5.0.0",
		"fs-extra": "^11.2.0",
		"rimraf": "^5.0.5"
	},
	"devDependencies": {
		"@jsdevtools/version-bump-prompt": "6.1.0",
		"@types/fs-extra": "^11.0.4",
		"@types/node": "^20.11.30",
		"@types/npmcli__package-json": "^4.0.3",
		"eslint": "8.57.0",
		"tsup": "^8.0.2",
		"typescript": "^5.4.3"
	}
}
