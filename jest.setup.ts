/// <reference types="@types/jest" />
/// <reference types="@types/node" />

// Import Jest globals first
import { expect, jest } from '@jest/globals';

// Import testing library configuration
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { TextEncoder, TextDecoder } from 'util';

// Configure React Testing Library
configure({
	testIdAttribute: 'data-test-id',
});

// Polyfill for TextEncoder/TextDecoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;

// Mock global objects
beforeEach(() => {
	// Reset all mocks before each test
	jest.clearAllMocks();

	// Mock window.matchMedia
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: jest.fn().mockImplementation((query: string) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: jest.fn(), // deprecated
			removeListener: jest.fn(), // deprecated
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
			dispatchEvent: jest.fn(),
		})),
	});

	// Mock localStorage
	const localStorageMock = (() => {
		let store: Record<string, string> = {};

		return {
			getItem(key: string) {
				return store[key] || null;
			},
			setItem(key: string, value: string) {
				store[key] = String(value);
			},
			removeItem(key: string) {
				delete store[key];
			},
			clear() {
				store = {};
			},
		};
	})();

	Object.defineProperty(window, 'localStorage', {
		value: localStorageMock,
	});
});

afterEach(() => {
	// Clean up after each test
	jest.restoreAllMocks();
});
