import { expect as JestExpect, jest as JestMock } from '@jest/globals';

declare global {
	const expect: typeof JestExpect;
	const jest: typeof JestMock;
}
