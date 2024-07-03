describe('Payment with Token', () => {

    let transactionNumber;
    let randomId
    let urlRedirect
    const email = Cypress.env('email')
    const password = Cypress.env('password')
    const username = Cypress.env('username')
    const baseurl = Cypress.env('baseUrl')


  it('Creación de la transacción', () => {
    let randomNumber = Math.floor(Math.random() * 900000) + 100000;
    cy.request({
    method:'GET',
    url:baseurl+'/api/CustomerCardIdentifiers/'+email+'/list',
    auth: {
      username: username,
      password: password
    }
  }).then(response =>   {
    const allIds = response.body.customerCardIdentifiers.map(item => item.id);
    expect(allIds.length).to.be.greaterThan(0);
    // Seleccionar aleatoriamente uno de los IDs
    randomId = allIds[Math.floor(Math.random() * allIds.length)];
    // Hacer lo que necesites con el ID seleccionado, como imprimirlo
    cy.log("El card token seleccionado es:" +randomId);

         let postData = {
          ReferenceNumber: randomNumber, 
          Amount: 6.00,
          Currency: "MXN",
          Email: email,
          CustomerCardIdentifier:{
            Id:randomId//"dba61a3e-f990-4a39-8821-4f879c854105" 
          }
        };

        // Realizar la solicitud POST con Basic Auth
        cy.request({
          method: 'POST',
          url: baseurl+'/api/pay/create',
          body: postData,
          auth: {
            username: username,
            password: password
          }
          
        }).then((response) => {
          // Verificar que la solicitud se haya realizado correctamente
          cy.log('Datos del objeto:', JSON.stringify(response.body));
          urlRedirect = response.body.urlRedirect;
          transactionNumber = response.body.transactionNumber;
          cy.log('Datos post', JSON.stringify(postData))
          cy.visit(urlRedirect)
          cy.get('.text-justify').should('contain', 'Se está procesando tu solicitud, por favor no cierres, refresques la página ni regreses a la página anterior.');
          cy.wait(6000)
    
        });    
    })
    
  });
 
  

  it('Validar la transacción pagada', () => {
    cy.request({
      method: 'GET',
      url: baseurl+'/api/transaction/responsemaster/'+transactionNumber,
    }).then((response) => {

      if(response.body.status === 'Accepted'){
        expect(response.body.transactionNumber).to.eq(transactionNumber)
        cy.log('La transacción '+transactionNumber+' se pago con exito')
      } else {
        throw new Error('El estatus de la transacción es incorrecto, es: '+response.body.status);
      }

  })
  })


})