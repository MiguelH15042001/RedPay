// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
const baseUrlDash = Cypress.env('baseUrlDash')

Cypress.Commands.add('login', (userDash, passDash) => {
    cy.visit(baseUrlDash+'/login')
    cy.get('.rs-form > :nth-child(2) > .rs-form-control-wrapper > .rs-input').type(userDash); // Ingresa el nombre de usuario
    cy.get('.inputIcon > .rs-form-control-wrapper > .rs-input').type(passDash)
    cy.get('a[name="Environment"]').click();
    cy.get('div[data-key="Sandbox"]').click();
    cy.get('.rs-btn-toolbar > .rs-btn').click()
    cy.get('h2.ttl_section').should('include.text', 'Lista de negocios');
  });
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })