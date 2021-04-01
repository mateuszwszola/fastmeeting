describe('User signup and signin', () => {
  describe('Unauthorized', () => {
    it('redirects unauthenticated users to signin', () => {
      cy.visit('/dashboard');
      cy.location('pathname').should('equal', '/signin');
    });
  });

  describe('User signin', () => {
    it('displays error with invalid credentials', () => {
      cy.contains('Sign in with password').click();

      cy.get('[data-cy=sign-in-btn]').should('be.disabled');

      cy.get('#email').type('user@email.com');
      cy.get('#password').type('password123');

      cy.get('[data-cy=sign-in-btn]').should('not.be.disabled');

      cy.get('[data-cy=sign-in-btn]').click();

      cy.contains('Invalid email or password');

      cy.url().should('include', '/signin');
    });

    it('sign in the user', () => {});
  });
});
