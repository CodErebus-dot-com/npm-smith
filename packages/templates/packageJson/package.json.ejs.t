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
		"rimraf": "^5.0.5"
	},
	"devDependencies": {
		"@commitlint/cli": "19.2.1",
		"@commitlint/config-conventional": "19.1.0",
		"@jsdevtools/version-bump-prompt": "6.1.0",
		"@types/fs-extra": "^11.0.4",
		"@types/node": "^20.11.30",
		"@types/npmcli__package-json": "^4.0.3",
		"commitizen": "4.3.0",
		"cz-conventional-changelog": "3.3.0",
		"eslint": "8.57.0",
		"fs-extra": "^11.2.0",
		"husky": "9.0.11",
		"lint-staged": "15.2.2",
		"prettier": "3.2.5",
		"tsup": "^8.0.2",
		"typescript": "^5.4.3"
	},
	"lint-staged": {
		"*.{js,jsx,ts,tsx}": [
			"prettier --write",
			"eslint --fix"
		],
		"*.{json,yaml,md,html}": [
			"prettier --write"
		]
	},
	"commitlint": {
		"extends": [
			"@commitlint/config-conventional"
		],
		"rules": {
			"body-leading-blank": [
				2,
				"always"
			]
		}
	},
	"config": {
		"commitizen": {
			"path": "node_modules/cz-conventional-changelog"
		}
	}
}
