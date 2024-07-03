describe('Reversar una autorización', () => {

    const userDash='QA_DBs';
    const passDash='Ab123456$';
    // Autenticación básica (username y password)
   
    it('Creación de la transacción', () => {
      cy.visit('https://appredpaydashboarddev.azurewebsites.net/login')
      cy.get('.rs-form > :nth-child(2) > .rs-form-control-wrapper > .rs-input').type(userDash)
      cy.get('.inputIcon > .rs-form-control-wrapper > .rs-input').type(passDash)
      cy.get('a[name="Environment"]').click();
      cy.get('div[data-key="Sandbox"]').click();
      cy.get('.rs-btn-toolbar > .rs-btn').click()
      cy.get('.rs-notification-item-content').should('include.text', 'Inicio de sesión no valido');
    
    });
    
    
    

})