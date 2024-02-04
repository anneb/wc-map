describe('WebMapboxGL Component', () => {
    beforeEach(() => {
      cy.visit('/cypress/html/web-mapbox-gl-test.html') // Adjust URL as needed
    });
    it('renders correctly and eventually has status \'ready\'', () => {
      cy.get('web-mapbox-gl').shadow().find('div#map').should('exist'); // Ensures web-map renders correctly
      cy.get('web-mapbox-gl').invoke('prop', 'status').should('equal', 'web-mapbox-gl ready');
      cy.get('web-mapbox-gl').compareSnapshot('web-mapbox-gl');
    });
  });