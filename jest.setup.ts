// Import and set up expect first
import { expect as jestExpect, jest } from '@jest/globals';
(global as any).expect = jestExpect;
(global as any).jest = jest;

// Then import other dependencies
import { TextEncoder, TextDecoder } from 'util';
import React from 'react';

// Add TextEncoder/TextDecoder polyfills
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder as typeof global.TextDecoder;
}

// Add React to global scope
(global as any).React = React;

// Mock next-auth
jest.mock('next-auth', () => ({
  getServerSession: jest.fn(() =>
    Promise.resolve({
      user: {
        name: 'Test User',
        email: 'test@example.com',
      },
    })
  ),
}));

// Import testing-library after expect is set up
import '@testing-library/jest-dom';
import 'jest-environment-jsdom';

// Configure React Testing Library
beforeEach(() => {
  // Reset all mocks before each test
  jest.clearAllMocks();
});
