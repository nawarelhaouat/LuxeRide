describe('Landing Page – Tests fonctionnels', () => {

  beforeEach(() => {
    cy.intercept(
      'GET',
      '**/api/client/voitures/most-rented**',
      { fixture: 'offers.json' }
    ).as('getOffers');

    cy.visit('/');
  });

  it('doit afficher toutes les sections principales', () => {
    cy.get('app-navbar').should('exist');
    cy.get('app-hero-section').should('exist');
    cy.get('app-popular-offers').should('exist');
    cy.get('app-contact').should('exist');
    cy.get('app-footer').should('exist');
  });

  it('doit charger les offres populaires', () => {
    cy.get('.card', { timeout: 10000 })
      .should('have.length.at.least', 1);

    cy.get('.card').first().within(() => {
      cy.get('.brand-value').should('not.be.empty');
      cy.get('.model-value').should('not.be.empty');
      cy.get('.btn-reserve').should('exist');
    });
  });

  it('doit naviguer vers la page réservation après clic', () => {
    cy.get('.btn-reserve', { timeout: 10000 })
      .first()
      .click();

    cy.url().should('include', '/reservation-client');
  });

});
