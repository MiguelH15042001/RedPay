const baseUrlDash = Cypress.env('baseUrlDash')

Cypress.Commands.add('logoutIfLoggedIn', () => {
  cy.get('.button-user > :nth-child(1) > :nth-child(3) > .rs-dropdown-item-content').then(($button) => {
    if ($button.length > 0) {
      cy.get('.button-user > :nth-child(1) > :nth-child(3) > .rs-dropdown-item-content').click({force:true}) // Haz clic en el botón de cerrar sesión
    } else {
     
      cy.log('No se cerró la sesión porque el usuario no está autenticado.');
    }
  });
});
let today = new Date();
let todayA = today.toISOString().slice(0, 10);


describe('Negocio', () => {

    const userDash = Cypress.env('userDash')
    const passDash = Cypress.env('passDash')
    const companyDash = Cypress.env('companyDash')


    
          // cy.login(userDash,passDash);
        
          // afterEach(() => {
          //   cy.logoutIfLoggedIn();
          // });

    it('Buscar negocio y validar apartados', () => {
      cy.login(userDash,passDash);

      cy.get('.rs-input').type(companyDash)
      cy.get('.btn_link').click()
      cy.get('.ttl_section').should('include.text','Resumen')
      cy.get(':nth-child(1) > :nth-child(3) > a').click()
      cy.get('.ttl_section').should('include.text','Movimientos')
      cy.get(':nth-child(1) > :nth-child(4) > a').click()
      cy.get('.ttl_section').should('include.text','Suscripciones')
      cy.get('.content_nav > :nth-child(1) > :nth-child(5) > a').click()
      cy.get('.ttl_section').should('include.text','Preautorizaciones')
      cy.get('.content_nav > :nth-child(1) > :nth-child(6) > a').click() 
      cy.get('.ttl_section').should('include.text','Ligas de pago')
      cy.get(':nth-child(7) > a').click()
      cy.get('.ttl_section').should('include.text','Gestión de fraude')
      cy.get(':nth-child(8) > a').click()
      cy.get('.ttl_section').should('include.text','Contracargos')
      cy.get(':nth-child(2) > :nth-child(3) > a').click()
      cy.get('.ttl_section').should('include.text','Integración')
      cy.get('.item_nav_foot').click()
      cy.get('.ttl_section').should('include.text','Centro de ayuda')
      });
    
    
      

})