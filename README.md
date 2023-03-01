# Restaurant Catalog App
Part of Dicoding Frontend Expert Path.

### Techs
- Vanilla Typescript
- Lit Element
- SCSS
- Webpack 5
- Zod
- IndexedDB
- Workbox
- Playwright + Vitest

### Get Started
```bash
# Development mode
npm run start-dev

# Production mode
npm run start-prod

# Analyze bundle size 
npm run bundle-analyze
```
Unit test
```bash
# Run mode
npm run test

# Watch mode
npm run test:watch
```
E2E
```bash
# Headless mode
npm run e2e

# Debug mode 
npm run e2e:debug
```

### Limitations
1. Using a simple home-made history router for routing. As there is no integrated backend server to serve HTML files on different route other than root, reloading will cause HTTP GET error.
2. Additionally, testing with Lighthouse will lead to the same problem in PRODUCTION mode other than home page. Therefore, testing with lighthouse should be done in DEVELOPMENT mode as webpack can fallback to index.html. 