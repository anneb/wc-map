describe('WebMapLibreGL Component', () => {
    beforeEach(() => {
      cy.visit('/cypress/html/web-maplibre-gl-test.html') // Adjust URL as needed
    });
    it('renders correctly and eventually has status \'ready\'', () => {
      cy.get('web-maplibre-gl').shadow().find('div#map').should('exist'); // Ensures web-map renders correctly
      cy.get('web-maplibre-gl').invoke('prop', 'status').should('equal', 'web-maplibre-gl ready');
      cy.get('web-maplibre-gl').compareSnapshot('web-maplibre-gl');
    });
  });