import { NextResponse } from 'next/server';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
	try {
		// Read the YAML file
		const yamlPath = join(process.cwd(), 'docs', 'api', 'swagger.yaml');
		const yamlContent = readFileSync(yamlPath, 'utf8');

		// Parse YAML to JSON
		const jsonContent = load(yamlContent);

		// Create response with cache headers
		return new NextResponse(JSON.stringify(jsonContent), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'public, max-age=31536000, immutable',
			},
		});
	} catch (error) {
		console.error('Error serving swagger.json:', error);
		return NextResponse.json(
			{ message: 'Error loading API documentation' },
			{ status: 500 }
		);
	}
}