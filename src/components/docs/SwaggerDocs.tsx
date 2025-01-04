'use client';

import dynamic from 'next/dynamic';
import type { SwaggerUIProps } from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic<SwaggerUIProps>(() => import('swagger-ui-react'), { ssr: false });

export default function SwaggerDocs() {
	return <SwaggerUI url="/api/docs/swagger.json" docExpansion="list" />;
}