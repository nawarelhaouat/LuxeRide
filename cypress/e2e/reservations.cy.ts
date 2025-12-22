describe('Page Réservations', () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200/reservations')
  })

  it('devrait afficher le titre Réservations', () => {
    cy.contains('Réservations').should('be.visible')
  })

  it('devrait afficher le filtre par date', () => {
    cy.contains('Date de début').should('be.visible')
    cy.contains('Date de fin').should('be.visible')
    cy.contains('Filtrer').should('be.visible')
  })

  it('devrait afficher le tableau des réservations', () => {
    cy.get('table').should('exist')
  })

  it('peut afficher un tableau vide sans erreur', () => {
    cy.get('tbody').should('exist')
  })

})
