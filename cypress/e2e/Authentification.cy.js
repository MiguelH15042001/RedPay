
describe('Authentification', () => {
  const password = Cypress.env('password')
  const username = Cypress.env('username')
  const baseurl = Cypress.env('baseUrl')

  it('Autentificación', () => {
      const postData = {
        
      "userId": username,
      "Password": password
    
    }

    cy.request({
      method: 'POST',
      url: baseurl+'/api/auth/Authenticate',
      body: postData,
    }).then((response) => {
      expect(response.status).to.eq(200);
      let token = response.body.token;
      console.log('El token es:', token);
      
    }).catch((error) => {
      cy.log('Error al procesar la solicitud:', error.message);
    });
  
  })
 

});
