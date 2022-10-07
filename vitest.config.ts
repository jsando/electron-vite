import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        outputFile: './junit.xml',
        reporters: ['verbose', 'junit'],
    },
})