import config from './vite.config.js';

export default {
  ...config,
  build: {
    ...config.build,
    sourcemap: true,
  },
}