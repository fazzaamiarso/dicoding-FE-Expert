# Restaurant Catalog App
Part of Dicoding Frontend Expert Path.

## Techs
- Vanilla Typescript
- Custom Element
- SCSS
- Webpack 5

## Submission 2
### Techs
- Vanilla Typescript
- Lit Element
- SCSS
- Webpack 5
- Zod
- IndexedDB
- Workbox

### Limitations
1. Using a simple home-made history router for routing. As there is no integrated backend server to serve HTML files on different route other than root, reloading will cause HTTP GET error.
2. Additionally, testing with Lighthouse will lead to the same problem in PRODUCTION mode. Therefore, testing with lighthouse should be done in DEVELOPMENT mode as webpack can fallback to index.html. 