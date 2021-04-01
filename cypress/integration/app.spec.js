/// <reference types="cypress" />

describe('Index page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('contains project heading and button to login', () => {
    cy.get('[data-cy=main-heading]').should('exist');

    cy.contains('Login');
  });

  it('creates a room and redirects to a meeting page', () => {
    cy.contains('Create room');

    cy.get('#name-label').contains('Display Name');

    cy.get('[data-cy=room-form-btn]').click();

    cy.location('pathname').should('equal', '/');

    cy.get('#name').type('Matthew').should('have.value', 'Matthew');

    cy.intercept('POST', '/api/room/create', (req) => {
      req.reply((res) => {
        res.body = { roomName: 'room-name' };
      });
    }).as('createRoom');

    cy.intercept('GET', `${Cypress.env('supabaseUrl')}/rest/v1/rooms*`, {
      fixture: 'room',
    }).as('getRoom');

    cy.get('[data-cy=room-form-btn]').click().should('be.disabled');

    cy.get('[data-cy=toggle-create]').should('be.disabled');

    cy.wait('@createRoom');

    cy.wait('@getRoom');

    cy.location('pathname').should('equal', '/room-name');
  });

  it('joins a room and redirects to a meeting page', () => {
    cy.get('[data-cy=toggle-create]').click();

    cy.contains('Join room');

    cy.get('#name-label').contains('Display Name');

    cy.get('#roomName-label');

    cy.get('[data-cy=room-form-btn]').click();

    cy.location('pathname').should('equal', '/');

    cy.get('#name').type('Matthew').should('have.value', 'Matthew');

    cy.get('#roomName').type('roomName').should('have.value', 'roomName');

    cy.fixture('room').then((room) => {
      room[0].slug = 'roomName';

      cy.intercept('GET', `${Cypress.env('supabaseUrl')}/rest/v1/rooms*`, [
        room[0],
      ]).as('getRoom');

      cy.get('[data-cy=room-form-btn]').click().should('be.disabled');

      cy.get('[data-cy=toggle-create]').should('be.disabled');

      cy.wait('@getRoom');

      cy.location('pathname').should('equal', `/${room[0].slug}`);
    });
  });
});
