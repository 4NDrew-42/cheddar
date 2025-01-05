// Use CommonJS for Jest configuration
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	setupFiles: ['<rootDir>/jest.setup.ts'],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts', '@testing-library/jest-dom'],
	moduleNameMapper: {
		// Handle CSS imports (with CSS modules)
		'\\.css$': 'identity-obj-proxy',
		// Handle image imports
		'\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
		// Handle module aliases
		'^@components/(.*)$': '<rootDir>/src/components/$1',
		'^@lib/(.*)$': '<rootDir>/src/lib/$1',
		'^@models/(.*)$': '<rootDir>/src/models/$1',
		'^@app/(.*)$': '<rootDir>/src/app/$1',
		'^next-auth$': '<rootDir>/node_modules/next-auth/dist/index.js',
		'^next-auth/middleware$': '<rootDir>/node_modules/next-auth/middleware.js',
	},
	transform: {
		'^.+\\.(ts|tsx)$': [
			'ts-jest',
			{
				tsconfig: 'tsconfig.json',
				isolatedModules: true,
				diagnostics: {
					ignoreCodes: [1343],
				},
				useESM: true,
				babelConfig: true,
				jsx: 'react-jsx',
			},
		],
		'^.+\\.(js|jsx)$': 'babel-jest',
	},
	testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
	extensionsToTreatAsEsm: ['.ts', '.tsx'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
	transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
};
