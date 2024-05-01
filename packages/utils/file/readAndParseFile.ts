import fs from 'fs-extra';

export const readAndParseFile = (filePath: string): object | null => {
	try {
		const fileContent = fs.readFileSync(filePath, 'utf8');
		return JSON.parse(fileContent);
	} catch (error) {
		console.error(
			`Error reading or parsing file at ${filePath}:`,
			error.message,
		);
		return null;
	}
};
