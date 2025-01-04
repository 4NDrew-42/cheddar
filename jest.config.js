import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.test' });

export default {
	preset: 'ts-jest/presets/default-esm',
	testEnvironment: 'node',
	setupFiles: ['<rootDir>/jest.setup.ts'],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				useESM: true,
				tsconfig: 'tsconfig.json',
				isolatedModules: true,
				diagnostics: {
					ignoreCodes: [1343],
				},
			},
		],
	},
	extensionsToTreatAsEsm: ['.ts'],
	testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
	globals: {
		'ts-jest': {
			useESM: true,
		},
	},
	resolver: 'jest-node-exports-resolver',
};
