describe('Negocio', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Ignorar errores no capturados
        return false;
      });
      
    it('Buscar negocio y validar apartados', () => {
        cy.visit('https://boletos.redaccess.com/')
        cy.get(':nth-child(3) > .box_info_event > .btn__more_info_home').click()
        cy.get('#btn-brand').click()
        cy.wait(6000)
        cy.get('#captcha').click({ x: 175, y: 32, force:true });


    })

})