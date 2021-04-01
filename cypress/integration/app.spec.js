/// <reference types="cypress" />

describe('Index page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('contains project heading and a button to login', () => {
    cy.get('[data-cy="main-heading"]').should('exist');

    cy.contains('Login');
  });

  it('creates a room', () => {
    cy.contains('Create room');

    cy.get('#name-label').contains('Display Name');

    cy.get('[data-cy=room-form-btn]').click();

    cy.location('pathname').should('equal', '/');

    cy.get('#name').type('John Doe').should('have.value', 'John Doe');

    cy.intercept('POST', '/api/room/create', (req) => {
      req.reply((res) => {
        res.body = { roomName: 'room-name' };
      });
    }).as('createRoom');

    cy.get('[data-cy=room-form-btn]').click();

    cy.wait('@createRoom');

    cy.location('pathname').should('equal', '/room-name');
  });

  it('Verify room form box - join', () => {
    cy.contains('Or join room instead').click();

    cy.contains('Join room');
  });
});
