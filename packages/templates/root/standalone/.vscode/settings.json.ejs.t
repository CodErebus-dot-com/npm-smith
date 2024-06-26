{
	"editor.tabSize": 2,
	"editor.detectIndentation": false,
	"search.exclude": {
		"package-lock.json": true,
		"yarn.lock": true,
		"pnpm-lock.yaml": true
	},
	"editor.defaultFormatter": "dbaeumer.vscode-eslint",
	"editor.formatOnSave": false,
	"editor.codeActionsOnSave": [
		"source.addMissingImports",
		"source.fixAll.eslint"
	],
	"eslint.rules.customizations": [{ "rule": "*", "severity": "warn" }], // ESLint errors in yellow warning
	"typescript.tsdk": "node_modules/typescript/lib", // Use the workspace version of TypeScript
	"typescript.enablePromptUseWorkspaceTsdk": true, // For security reasons it's require that users opt into using the workspace version of typescript
	// Multiple language settings for json and jsonc files
	"[json][jsonc][yaml]": {
		"editor.formatOnSave": true,
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"prettier.ignorePath": ".gitignore" // Don't run prettier for files listed in .gitignore
}
