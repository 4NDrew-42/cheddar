import SwaggerDocs from '../../components/docs/SwaggerDocs';

export default function ApiDocs() {
	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Cheddar API Documentation</h1>
			<SwaggerDocs />
		</div>
	);
}