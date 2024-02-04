describe('WebMapOpenLayers Component', () => {
    beforeEach(() => {
      cy.visit('/cypress/html/web-map-openlayers-test.html') // Adjust URL as needed
    });
    it('renders correctly and eventually has status \'ready\'', () => {
      cy.get('web-map-openlayers').shadow().find('div#map').should('exist'); // Ensures web-map renders correctly
      cy.get('web-map-openlayers').invoke('prop', 'status').should('equal', 'web-map-openlayers ready');
      cy.get('web-map-openlayers').compareSnapshot('web-map-openlayers');
    });
  });