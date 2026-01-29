describe('Sidebar - Dashboard / Notifications / Logout (sans data-cy)', () => {

  beforeEach(() => {
    // ================= MOCK BACKEND =================

    cy.intercept('GET', '**/notifications', {
      statusCode: 200,
      body: [
        {
          id: 1,
          text: 'Nouvelle réservation créée pour Audi A4',
          time: "À l'instant",
          read: false
        },
        {
          id: 2,
          text: 'Nouvelle réservation créée pour Mercedes',
          time: 'Il y a 5 min',
          read: false
        },
        {
          id: 3,
          text: 'Ancienne notification lue',
          time: 'Hier',
          read: true
        }
      ]
    }).as('getNotifications');

    cy.intercept('PATCH', '**/notifications/*/read', {
      statusCode: 200
    }).as('markOneRead');

    cy.intercept('PATCH', '**/notifications/read-all', {
      statusCode: 200
    }).as('markAllRead');

    // Simuler utilisateur connecté
    cy.window().then(win => {
      win.localStorage.setItem('token', 'fake-jwt-token');
    });

    cy.visit('/dashboard');
    cy.wait('@getNotifications');
  });

  // ==================================================
  // NAVIGATION (Dashboard seulement)
  // ==================================================
  it('Navigation vers Dashboard', () => {
    cy.contains('Tableau de Bord').click();
    cy.url().should('include', '/dashboard');
  });

  // ==================================================
  // NOTIFICATIONS
  // ==================================================
  it('Affiche uniquement les notifications NON lues', () => {
    cy.get('.notification-button').click();

    // 2 notifications non lues seulement
    cy.get('.notif-item').should('have.length', 2);

    // La notification lue ne doit PAS apparaître
    cy.contains('Ancienne notification lue').should('not.exist');
  });

  it('Marquer UNE notification comme lue la retire de la liste', () => {
    cy.get('.notification-button').click();

    cy.get('.notif-item').should('have.length', 2);

    // Cliquer sur "done_all" de la première notification
    cy.get('.notif-item')
      .first()
      .find('mat-icon')
      .contains('done_all')
      .click({ force: true });

    cy.wait('@markOneRead');

    // Il ne reste plus qu’une notification
    cy.get('.notif-item').should('have.length', 1);
  });

  it('Marquer TOUT comme lu vide la liste et affiche le message vide', () => {
    cy.get('.notification-button').click();

    cy.contains('Marquer tout lu').click();
    cy.wait('@markAllRead');

    cy.get('.notif-item').should('have.length', 0);
    cy.contains('Aucune notification').should('be.visible');
  });

  // ==================================================
  // LOGOUT
  // ==================================================
  it('Déconnexion : supprime localStorage et redirige vers login', () => {
    cy.get('.logout-button').click();

    cy.url().should('include', '/login');

    cy.window().then(win => {
      expect(win.localStorage.getItem('token')).to.eq(null);
    });
  });

  it('Après logout, le bouton BACK ne retourne pas au dashboard', () => {
    cy.get('.logout-button').click();
    cy.url().should('include', '/login');

    cy.go('back');
    cy.url().should('include', '/login');
  });
});
