import { describe, expect, it } from 'vitest';
import { sayHello } from './counter';

describe('renderer sample test', () => {
    it('something to verify testing and coverage is working', () => {
        const v = sayHello();
        expect(v).toBe('hello');
    });
});
