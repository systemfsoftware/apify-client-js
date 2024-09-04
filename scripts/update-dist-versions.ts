import fs from 'fs/promises';
import path from 'node:path';
import { glob } from 'glob';

async function updateDistVersions(): Promise<void> {
    try {
        // Read the main package.json
        const mainPackageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
        const version = mainPackageJson.version;

        // Find all package.json files in dist subdirectories
        const files = await glob('dist/*/package.json');

        // Update each found package.json
        for (const file of files) {
            await updatePackageJson(file, version);
        }

        console.log('Successfully updated versions in dist package.json files');
    } catch (error) {
        console.error('Error updating versions:', error);
        process.exit(1);
    }
}

async function updatePackageJson(filePath: string, version: string): Promise<void> {
    const fullPath = path.resolve(filePath);
    try {
        const packageJson = JSON.parse(await fs.readFile(fullPath, 'utf8'));
        packageJson.version = version;
        await fs.writeFile(fullPath, JSON.stringify(packageJson, null, 2));
        console.log(`Updated version in ${filePath}`);
    } catch (error) {
        if (error instanceof Error) {
            console.warn(`Warning: Error updating ${filePath}:`, error.message);
        } else {
            console.warn(`Warning: Unknown error updating ${filePath}`);
        }
    }
}

updateDistVersions();
