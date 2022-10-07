import { describe, expect, it } from 'vitest';
import { sayHello } from './main';
import { MyInterface } from '../../preload/src/types';

describe('main sample test', () => {
    it('something to verify testing and coverage is working', () => {
        const v = sayHello();
        expect(v).toBe('hello');
        const foo: MyInterface = {
            message: 'hi there',
        };
        expect(foo.message).toBe('hi there');
    });
});
