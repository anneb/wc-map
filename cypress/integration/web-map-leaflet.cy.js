describe('WebMapLeaflet Component', () => {
    beforeEach(() => {
      cy.visit('/cypress/html/web-map-leaflet-test.html') // Adjust URL as needed
    });
    it('renders correctly and eventually has status \'ready\'', () => {
      cy.get('web-map-leaflet').shadow().find('div#map').should('exist'); // Ensures web-map renders correctly
      cy.get('web-map-leaflet').invoke('prop', 'status').should('equal', 'web-map-leaflet ready');
      cy.get('web-map-leaflet').compareSnapshot('web-map-leaflet');
    });
  });