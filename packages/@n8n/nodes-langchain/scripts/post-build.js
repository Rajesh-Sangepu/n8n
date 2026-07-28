/**
 * Post-build script
 *
 * This is a separate script instead of inline npm commands because using "&&"" to chain commands in --onSuccess can cause the watch mode to hang
 */

const { execFileSync } = require('child_process');

function runCommand(file, args = []) {
	try {
		execFileSync(file, args, { stdio: 'inherit' });
	} catch (error) {
		console.error(`Command failed: ${file} ${args.join(' ')}`);
		process.exit(1);
	}
}

// Run all post-build tasks
runCommand('npx', ['tsc-alias', '-p', 'tsconfig.build.json']);
runCommand('node', ['../../nodes-base/scripts/copy-nodes-json.js', '.']);
runCommand('pnpm', ['n8n-copy-static-files']);
runCommand('pnpm', ['n8n-generate-metadata']);
