import { NextApiRequest, NextApiResponse } from 'next';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	try {
		// Read the YAML file
		const yamlPath = join(process.cwd(), 'docs', 'api', 'swagger.yaml');
		const yamlContent = readFileSync(yamlPath, 'utf8');

		// Parse YAML to JSON
		const jsonContent = load(yamlContent);

		// Set cache headers
		res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

		// Send the JSON response
		res.status(200).json(jsonContent);
	} catch (error) {
		console.error('Error serving swagger.json:', error);
		res.status(500).json({ message: 'Error loading API documentation' });
	}
}
