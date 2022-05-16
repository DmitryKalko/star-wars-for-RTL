describe('MainPage', () => {

    it('shoul have a form', () => {
        cy.visit('http://localhost:3000/');
        cy.get('.figureCard:first-child .buyFigure').click()
    });

    it("check input", () => {
            cy.get('input').should('have.value', '');
            cy.get('input').type('email').should('have.value', 'email');
            cy.get('button').should('have.text', 'Pre-order Now');
            cy.contains('Pre-order Now').click();
        });

    it("shoul click on another figure card", () => {
        cy.get('.figureCard').should('have.length', 3);
        cy.get('.figureCard:last-child .buyFigure').click()
    });
});



