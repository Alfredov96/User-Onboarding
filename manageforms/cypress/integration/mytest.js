describe('test my code', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    });
    it('testing everything', () => {
        cy.get('input[name="name"]')
            .type('Alfredo')
            .should('have.value', 'Alfredo')
        cy.get('input[name="email"]')
            .type('a')
            .clear()
        // cy.get('.error')
        //     .contains('Must include email address.')
        cy.get('input[name="email"]')
            .type('fredo@hotmail.com')
            .should('have.value', 'fredo@hotmail.com')
        cy.get('input[name="password"]')
            .type('Helping out')
            .should('have.value', 'Helping out')
        cy.get('[type="checkbox"]')
            .check()
            .should('be.checked')
        cy.get('button')
            .click()
        
    });
 
});