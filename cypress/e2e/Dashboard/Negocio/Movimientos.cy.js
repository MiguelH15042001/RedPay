describe('Resumen', () => {
    const userDash = Cypress.env('userDash')
    const passDash = Cypress.env('passDash')
    const companyDash = Cypress.env('companyDash')
    let today = new Date();
    let todayA = today.toISOString().slice(0, 10);
    let contenido

    it('Validar Dia de entrada', () => {
        // cy.visit(baseUrlDash+'/home')
        cy.login(userDash,passDash);
        cy.get('.rs-input').type('Tehuacantest')
        cy.get('.btn_link').click()
        cy.get(':nth-child(1) > :nth-child(3) > a').click()
        cy.get('.ttl_section').should('include.text','Movimientos')
        cy.get('.rs-picker-daterange > .rs-btn').should('include.text',todayA+' ~ '+todayA+'✕' )
    
       })

       
    it('Validar estatus', () => {
        cy.login(userDash,passDash);
        cy.get('.rs-input').type(companyDash)
        cy.get('.btn_link').click()
        cy.get(':nth-child(1) > :nth-child(3) > a').click()
        cy.get('.ttl_section').should('include.text','Movimientos')
        cy.get('.rs-picker-select > .rs-btn').click()
        cy.get('.ReactVirtualized__Grid').should('exist');  
        cy.get('[data-key="1"] > .rs-picker-select-menu-item').should('include.text','Creada')
        cy.get('[data-key="2"] > .rs-picker-select-menu-item').should('include.text','Pagada')
        cy.get('[data-key="3"] > .rs-picker-select-menu-item').should('include.text','Rechazada')
        cy.get('[data-key="4"] > .rs-picker-select-menu-item').should('include.text','Cancelada por cliente')
        cy.get('[data-key="5"] > .rs-picker-select-menu-item').should('include.text','Pendiente de pago')
        cy.get('[data-key="6"] > .rs-picker-select-menu-item').should('include.text','Expirada')
        cy.get('[data-key="7"] > .rs-picker-select-menu-item').should('include.text','En revisión')
        cy.get('[data-key="8"] > .rs-picker-select-menu-item').should('include.text','Autorizada')
        cy.get('[data-key="9"] > .rs-picker-select-menu-item').should('include.text','Reversada')
        cy.get('[data-key="10"] > .rs-picker-select-menu-item').should('include.text','No Pagada')
        cy.get('[data-key="11"] > .rs-picker-select-menu-item').should('include.text','Reemplazada')
        cy.get('[data-key="12"] > .rs-picker-select-menu-item').should('include.text','Reembolsada')
        cy.get('[data-key="13"] > .rs-picker-select-menu-item').should('include.text','Autorización expirada')
        cy.get('[data-key="14"] > .rs-picker-select-menu-item').should('include.text','Referencia expirada')
        cy.get('[data-key="15"] > .rs-picker-select-menu-item').should('include.text','Cancelada')
        cy.get('[data-key="16"] > .rs-picker-select-menu-item').should('include.text','Parcialmente reembolsada')
        cy.get('[data-key="17"] > .rs-picker-select-menu-item').should('include.text','Contracargo')
        
       })

    //    it.only('Validar barra de busqueda', () => {
    //     cy.login(userDash,passDash);
    //     cy.get('.rs-input').type(companyDash)
    //     cy.get('.btn_link').first().click()
    //     cy.get(':nth-child(1) > :nth-child(3) > a').click({force:true})
    //     cy.get('.ttl_section').should('include.text','Movimientos')
    //     cy.get('.rs-picker-toggle-clean').click()
    //     cy.get('.mb-2 > .rs-btn').click()
    //     cy.wait(3000)

    //     cy.get('#row-0 > [id^="cell-"] > .btn_link').first().then(element => {
    //         // Utiliza console.log() para imprimir el elemento en la consola de Cypress
    //         cy.log(element.text());
    //         contenido = cy.get('#row-0 > [id^="cell-"] > .btn_link');
    //     });

    //     cy.get('#row-0 > [id^="cell-"] > .btn_link').first().click();

    //     cy.get('.ttl_section').should('include.text','Detalle de la transacción')
    //     cy.get(':nth-child(1) > :nth-child(1) > .fw-300').then(element => {
    //         // Utiliza console.log() para imprimir el elemento en la consola de Cypress
    //         cy.log(element.text());
    //           });        
    //     cy.get(':nth-child(1) > :nth-child(1) > .fw-300').should('text',contenido)

                  
        
    //     });






    })