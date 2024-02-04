describe('WebMap Component', () => {
    beforeEach(() => {
      cy.visit('/cypress/html/web-map-test.html') // Adjust URL as needed
    });
    it('renders correctly and eventually has status \'ready\'', () => {
      cy.get('web-map').shadow().find('div#map').should('exist'); // Ensures web-map renders correctly
      cy.get('web-map').invoke('prop', 'status').should('equal', 'web-map ready');
      cy.get('web-map').compareSnapshot('web-map');
    });
  });