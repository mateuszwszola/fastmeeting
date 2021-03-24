/// <reference types="cypress" />

describe('Basic e2e test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Verify homepage heading exists', () => {
    cy.get('[data-cy="main-heading"]').should('exist');
  });
});
