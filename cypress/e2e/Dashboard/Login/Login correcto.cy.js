describe('Reversar una autorización', () => {

    const userDash = Cypress.env('userDash')
    const passDash = Cypress.env('passDash')
    const baseUrlDash = Cypress.env('baseUrlDash')

    it('Creación de la transacción', () => {
      cy.visit(baseUrlDash+'/login')
      cy.get('.rs-form > :nth-child(2) > .rs-form-control-wrapper > .rs-input').type(userDash)
      cy.get('.inputIcon > .rs-form-control-wrapper > .rs-input').type(passDash)
      cy.get('a[name="Environment"]').click();
      cy.get('div[data-key="Sandbox"]').click();
      cy.get('.rs-btn-toolbar > .rs-btn').click()
      cy.get('h2.ttl_section').should('include.text', 'Lista de negocios');
    });
    
    
    

})