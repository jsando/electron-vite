# Template project for electron+vite+typescript

Just sharing this to get input from others, don't expect it to work for you.

I'm trying to get a basic CI build setup that has the following:

- Clean separation between the electron processes (main, preload, renderer)
- Code coverage in junit.xml (for use in Jenkins)
- Verify and reformat code with prettier
- Linting with eslint
- Share type defs across electron processes
- Not using a vite plugin for electron, as I want to understand the build fully
- Run in dev mode with HMR
- VSCode and IntelliJ fully working with intellisense and debugging

Started with https://blog.totominc.io/blog/electron-with-typescript-and-vite-as-a-build-system but had to make a few changes as (of course) many little things have changed since way way back in March 2022 (6 months is apparently ancient in JavaScript years).

