describe('Reservation Client - End To End Tests', () => {

  beforeEach(() => {
    cy.visit('/reservation-client');
  });

  it('should load reservation page correctly', () => {
    cy.contains('Résumé de la réservation').should('be.visible');
    cy.contains('Vos informations').should('be.visible');
    cy.contains('Dates de location').should('be.visible');
    cy.contains('Mode de paiement').should('be.visible');
  });

  it('should calculate total price based on selected dates', () => {

    cy.get('input[type="date"]').first().type('2024-06-10');
    cy.get('input[type="date"]').last().type('2024-06-15');

    cy.contains('.row', 'Nombre de jours')
      .find('strong')
      .should('contain', '5');

    cy.contains('MAD').should('be.visible');
  });

  it('should show payment unavailable modal when online payment selected', () => {

    cy.contains('Payer en ligne').click();
    cy.contains('Réserver').click();

    cy.contains('Paiement indisponible').should('be.visible');
  });

  it('should create reservation successfully with agency payment', () => {

    cy.get('input[placeholder="Prénom"]').type('Test');
    cy.get('input[placeholder="Nom"]').type('Client');
    cy.get('input[placeholder="Téléphone"]').type('0600000000');
    cy.get('input[placeholder="Email"]').type('test@mail.com');
    cy.get('input[placeholder="CIN"]').type('AA12345');

    cy.get('input[type="date"]').first().type('2024-06-10');
    cy.get('input[type="date"]').last().type('2024-06-15');

    cy.contains("Payer à l'agence").click();
    cy.contains('Réserver').click();

    cy.contains('Réservation confirmée', { timeout: 8000 })
      .should('be.visible');
  });

  it('should navigate back to client landing page', () => {

    cy.contains('Retour').click();
    cy.url().should('include', '/client');
  });

});
