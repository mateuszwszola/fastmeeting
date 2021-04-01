/// <reference types="cypress" />

describe('Meeting', () => {
  describe('Joining a room', () => {
    it('enters a room that does not exists', () => {
      cy.intercept(
        'GET',
        `${Cypress.env('supabaseUrl')}/rest/v1/rooms*`,
        []
      ).as('getRoom');

      const roomName = 'room-does-not-exists';

      cy.visit(`/${roomName}`);

      cy.wait('@getRoom');

      cy.contains(`Room ${roomName} does not exists`);
    });

    it('enters a room that is locked', () => {
      const roomName = 'locked-room';

      cy.fixture('room').then((data) => {
        data[0].locked = true;
        data[0].slug = roomName;

        cy.intercept('GET', `${Cypress.env('supabaseUrl')}/rest/v1/rooms*`, [
          data[0],
        ]).as('getRoom');
      });

      cy.visit(`/${roomName}`);

      cy.wait('@getRoom');

      cy.contains('locked');
    });
  });
});
