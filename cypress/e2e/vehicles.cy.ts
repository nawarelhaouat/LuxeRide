describe("Gestion des véhicules – Tests UI sans backend", () => {

  beforeEach(() => {
    cy.visit("http://localhost:4200/vehicles");
  });

  // -----------------------------
  it("Ouvre le modal d’ajout", () => {
    cy.contains("Ajouter un Véhicule").click();

    // Modal doit exister
    cy.get('[data-testid="vehicle-modal"]').should("exist");

    // Vérifier éléments du modal
    cy.contains("Annuler").should("exist");
    cy.contains("Ajouter").should("exist");
  });

  // -----------------------------
  it("Ferme le modal d’ajout", () => {
    cy.contains("Ajouter un Véhicule").click();

    cy.get('[data-testid="vehicle-modal"]').should("exist");

    cy.contains("Annuler").click();

    // Modal doit disparaître
    cy.get('[data-testid="vehicle-modal"]').should("not.exist");
  });

  // -----------------------------
  it("Remplit correctement le formulaire du modal", () => {
  cy.contains("Ajouter un Véhicule").click();

  cy.get('[data-testid="vehicle-modal"]').should("exist");

  cy.get('input[name="brand"]').type("Peugeot");
  cy.get('input[name="model"]').type("208");
  cy.get('input[name="plate"]').type("AA-123-AA");
  cy.get('input[name="pricePerDay"]').type("55");
  cy.get('select[name="status"]').select("available");

  cy.get('input[name="brand"]').should("have.value", "Peugeot");
  cy.get('input[name="model"]').should("have.value", "208");
  cy.get('input[name="plate"]').should("have.value", "AA-123-AA");

  // Vérification pour un input number
  cy.get('input[name="pricePerDay"]').should("have.value", "55");
});


});
