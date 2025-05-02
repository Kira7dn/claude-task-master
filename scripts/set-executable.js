import fs from 'fs';
import path from 'path';

// Files to set as executable
const files = [
	path.join('bin', 'task-master.js'),
	path.join('mcp-server', 'server.js')
];

files.forEach((file) => {
	try {
		// Get current permissions
		const stats = fs.statSync(file);

		// Set executable flag (cross-platform compatible)
		fs.chmodSync(file, stats.mode | 0o111);
		console.log(`Set executable permissions for: ${file}`);
	} catch (error) {
		console.error(`Failed to set executable permissions for: ${file}`, error);
	}
});
