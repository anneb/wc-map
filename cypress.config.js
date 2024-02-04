import { defineConfig } from 'cypress';
import { configureVisualRegression } from 'cypress-visual-regression/dist/plugin.js';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
    env: {
      visualRegression: {
        type: 'regression',
        baseDirectory: './cypress/snapshots/base',
        diffDirectory: './cypress/snapshots/diff',
        snapshotDirectory: './cypress/snapshots/actual',
      }
    },
    screenshotsFolder: './cypress/snapshots/actual',
    setupNodeEvents(on, config) {
      configureVisualRegression(on)
    }
  }
})
