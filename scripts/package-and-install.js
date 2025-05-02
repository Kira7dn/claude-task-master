import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

try {
	// Step 1: Run `npm pack` to create the .tgz file
	console.log('Packing the project...');
	const output = execSync('npm pack', { encoding: 'utf-8' });
	const tgzFile = output.trim();

	// Verify the .tgz file exists
	if (!fs.existsSync(tgzFile)) {
		throw new Error(`Failed to create .tgz file: ${tgzFile}`);
	}

	console.log(`Package created: ${tgzFile}`);

	// Step 2: Install the .tgz file globally
	console.log('Installing the package globally...');
	execSync(`npm install -g ${path.join(process.cwd(), tgzFile)}`, {
		stdio: 'inherit'
	});

	console.log('Package installed globally successfully!');

	// Step 3: Clean up the .tgz file
	console.log('Cleaning up...');
	fs.unlinkSync(tgzFile);
	console.log('Temporary package file removed.');
} catch (error) {
	console.error('An error occurred:', error.message);
	process.exit(1);
}
