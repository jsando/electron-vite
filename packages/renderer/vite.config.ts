import { join } from 'path';
import { builtinModules } from 'module';
import { defineConfig } from 'vite';

export default defineConfig({
    root: __dirname,
    base: './',

    build: {
        sourcemap: true,
        emptyOutDir: true,
        // Build output inside `dist/renderer` at the project root.
        outDir: '../../build/app/renderer',

        rollupOptions: {
            input: join(__dirname, 'index.html'),
            // Exclude node internal modules from build output.
            external: [...builtinModules.flatMap((p) => [p, `node:${p}`])],
        },
    },
});
