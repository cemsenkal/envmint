# EnvMint

EnvMint is a simple `.env` generator tool designed for fast and clean variable creation.
It runs entirely in the browser with no backend dependency.

## What’s behind the 'Copy Secret' button?

EnvMint uses the browser's native cryptography API:

```js
[...crypto.getRandomValues(new Uint8Array(32))]
  .map((b) => b.toString(16).padStart(2, "0"))
  .join("");
```

## Tech stack

- Svelte 5
- Vite

## License

MIT
