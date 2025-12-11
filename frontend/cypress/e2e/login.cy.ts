/// <reference types="cypress" />

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
  it('devrait accepter un email valide et afficher un message de succès', () => {

  cy.intercept('POST', '**/api/admin/recover-password').as('forgotReq');

  cy.visit('http://localhost:4200/login');

  cy.get('.forgot-link').click();
  cy.get('input[name="forgotEmail"]').type('eloukilinada2004@gmail.com');
  cy.get('.modal-btn').click();

  cy.wait('@forgotReq').its('response.statusCode').should('eq', 200);

  cy.contains("Email envoyé !").should('be.visible');
  cy.contains("Vérifiez votre boîte mail pour récupérer le nouveau code.")
    .should('be.visible');
});


  it('devrait afficher une erreur si le code est invalide', () => {
    cy.intercept('POST', '**/api/admin/login', { statusCode: 401 }).as('loginReq');

    cy.visit('http://localhost:4200/login');

    cy.get('input[name="code"]').type('00000');
    cy.get('.login-btn').click();

    cy.wait('@loginReq');
    cy.contains('Code administrateur invalide').should('be.visible');
  });

  it('devrait valider l’accès si le code est valide', () => {

  cy.intercept('POST', '**/api/admin/login*').as('loginReq');

  cy.visit('http://localhost:4200/login');

  cy.get('input[name="code"]').type('1234');
  cy.get('.login-btn').click();

  cy.wait('@loginReq').its('response.statusCode').should('eq', 200);

  // Vérifie que la redirection ou le message de succès apparaît
  //cy.url().should('include', '/dashboard');  
});

});
