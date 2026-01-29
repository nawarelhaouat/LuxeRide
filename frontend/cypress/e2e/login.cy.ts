describe('Test fonctionnel - Login', () => {

  it('devrait afficher la page de login', () => {
    cy.visit('http://localhost:4200/login');
    cy.contains("Portail d'administration sécurisé").should('be.visible');
  });

  it('devrait afficher/masquer le code administrateur', () => {
    cy.visit('http://localhost:4200/login');

    cy.get('input[name="code"]').should('have.attr', 'type', 'password');
    cy.get('.toggle-password-icon').click();
    cy.get('input[name="code"]').should('have.attr', 'type', 'text');
  });

  it('devrait ouvrir la fenêtre de récupération', () => {
    cy.visit('http://localhost:4200/login');

    cy.get('.forgot-link').click();
    cy.contains("Récupérer l'accès").should('be.visible');
  });

  it('devrait refuser un email invalide', () => {
    cy.visit('http://localhost:4200/login');

    cy.get('.forgot-link').click();
    cy.get('input[name="forgotEmail"]').type('invalid');
    cy.get('.modal-btn').click();

    cy.contains("Veuillez entrer une adresse email valide.").should('be.visible');
  });

  it('devrait afficher une erreur si le code est invalide', () => {
    cy.intercept('POST', '**/api/login', { statusCode: 401 }).as('loginReq');

    cy.visit('http://localhost:4200/login');

    cy.get('input[name="code"]').type('00000');
    cy.get('.login-btn').click();

    cy.wait('@loginReq');
    cy.contains('Code administrateur invalide').should('be.visible');
  });
});
