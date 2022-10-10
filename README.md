# Template project for electron+vite+typescript

Sharing this to get input from others, don't expect it to work for you.

I'm trying to get a basic CI build setup that has the following:

- [x] Clean separation between the code for the different electron processes (main, preload, renderer)
- [x] Code coverage in junit.xml (for use in Jenkins)
- [x] Verify and reformat code with prettier
- [x] Linting with eslint
- [x] Share type defs across electron processes
- [x] Not using a vite plugin for electron, as I want to understand the build fully
- [x] Electron builder to produces runtime image (for x64 linux, from m1 mac)
- VSCode and IntelliJ fully working with intellisense and debugging
- Run in dev mode with HMR

Started with https://blog.totominc.io/blog/electron-with-typescript-and-vite-as-a-build-system but had to make a few changes as (of course) many little things have changed since way way back in March 2022 (6 months is apparently ancient in JavaScript years).

