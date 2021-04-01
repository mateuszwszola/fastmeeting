describe('Video Meeting', () => {
  describe('Creating a room', () => {
    beforeEach(() => {
      cy.intercept('POST', '/api/room/create').as('createRoom');
    });

    it('should create and enter meeting', () => {
      cy.visit('/');

      cy.contains('Create room');

      cy.get('#name').type('Matthew');

      cy.get('[data-cy=room-form-btn]').click();

      cy.wait('@createRoom').then((interception) => {
        const { roomName } = interception.response.body;

        cy.location('pathname').should('equal', `/${roomName}`);

        cy.get('#name').clear().type('Matthew');

        cy.get('[data-cy=continue]').click();

        cy.get('[data-cy=join-meeting]').click();

        cy.get('[data-cy=main-participant');

        cy.task('addParticipant', { name: 'testuser1', roomName });

        cy.task('addParticipant', { name: 'testuser2', roomName });

        cy.contains('Matthew');

        cy.contains('testuser1');

        cy.contains('testuser2');

        cy.pause();

        cy.get('[data-cy=leave-meeting]').click();

        cy.task('removeAllParticipants');
      });
    });
  });
});
