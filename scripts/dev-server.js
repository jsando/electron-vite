import electronPath from 'electron';
import { build, createLogger, createServer } from 'vite';
import { spawn } from 'child_process';

// Shared config across multiple build watchers.
const sharedConfig = {
    mode: 'development',
    build: { watch: {} },
};

/**
 * Create a Vite build watcher that automatically recompiles when a file is
 * edited.
 */
const getWatcher = (name, configFilePath, writeBundle) =>
    build(Object.assign(Object.assign({}, sharedConfig), { configFile: configFilePath, plugins: [{ name, writeBundle }] }));

    /**
 * Setup a watcher for the preload package.
 */
const setupPreloadWatcher = async (viteServer) =>
    getWatcher('reload-app-on-preload-package-change', 'packages/preload/vite.config.ts', () => {
        // Send a "full-reload" page event using Vite WebSocket server.
        viteServer.ws.send({ type: 'full-reload' });
    });

(async () => {
    try {
        const rendererServer = await createServer(
            Object.assign(Object.assign({}, sharedConfig), { configFile: 'packages/renderer/vite.config.ts' })
        );
        await rendererServer.listen();
        rendererServer.printUrls();
        await setupPreloadWatcher(rendererServer);
        await setupMainWatcher();
    } catch (err) {
        console.error(err);
    }
})().catch((err) => console.error(err));

/**
 * Setup the `main` watcher.
 */
 const setupMainWatcher = async () => {
    const logger = createLogger('info', { prefix: '[main]' });
    logger.info('watching');
    let spawnProcess = null;
    return getWatcher('reload-app-on-main-package-change', 'packages/main/vite.config.ts', () => {
        if (spawnProcess !== null) {
            spawnProcess.off('exit', () => process.exit(0));
            spawnProcess.kill('SIGINT');
            spawnProcess = null;
        }
        // Restart Electron process when main package is edited and recompiled.
        spawnProcess = spawn(String(electronPath), ['build/app/main/main.cjs']);
    });
};
