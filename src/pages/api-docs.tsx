import dynamic from 'next/dynamic';
import type { SwaggerUIProps } from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic<SwaggerUIProps>(() => import('swagger-ui-react'), { ssr: false });

export default function ApiDocs() {
	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Cheddar API Documentation</h1>
			<SwaggerUI url="/api/docs/swagger.json" docExpansion="list" />
		</div>
	);
}
