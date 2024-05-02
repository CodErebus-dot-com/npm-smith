{
	"devDependencies": {
		"@commitlint/cli": "19.2.1",
		"@commitlint/config-conventional": "19.1.0",
		"commitizen": "4.3.0",
		"cz-conventional-changelog": "3.3.0",
		"husky": "9.0.11",
		"lint-staged": "15.2.2",
		"prettier": "3.2.5"
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
