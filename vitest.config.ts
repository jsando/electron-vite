import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        outputFile: './build/test/junit.xml',
        reporters: ['verbose', 'junit'],
        coverage: {
            reportsDirectory: 'build/test/coverage'
        }
    },
});
