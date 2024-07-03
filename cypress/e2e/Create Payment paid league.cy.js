describe('Create payment paid league', () => {

    let urlRedirect;
    let transactionNumber;
    const cardNumber= '4242424242424242'
    let randomNumber = Math.floor(Math.random() * 900000) + 100000;
    const baseurl = Cypress.env('baseUrl')
    const password = Cypress.env('password')
    const username = Cypress.env('username')
    const email = Cypress.env('email')

    it('Creación de la transacción', () => {    
        // Datos para la solicitud POST
          let postData = {
          ReferenceNumber: randomNumber, 
          Amount: 6,
          Currency: "MXN",
          Email: email,
          PaymentProcess:{
            "OffsetExpiration":1 //días de vigencia
        }
          
        };
    
        cy.request({
          method: 'POST',
          url: baseurl+'/api/pay/createtransaction',
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
          cy.log('Valor de urlRedirect:', urlRedirect);
            cy.log('reference '+randomNumber)
            
      
        cy.visit(urlRedirect)

//Completar el formulario
  cy.get('#cardNumber').type(cardNumber)
  cy.get('#cardExpirationMonth'). type('07')
  cy.get('#cardExpirationYear').type('2029')
  cy.get('#cvv').type('522')
  cy.get('h5.fw300.mb-4', { timeout: 10000 }).should('exist').then(($element) => {
    // Obtener el texto del elemento
    const elementText = $element.text().trim();
    // Verificar si el texto del elemento incluye el número aleatorio
    expect(elementText).to.include(randomNumber.toString());
  });
  cy.get('#firstName').type('Miguel')
  cy.get('#firstName').type('Hernandez')
  cy.get('#phoneNumber').type('5621177845')
  cy.get('#postalCode').type('56214')
  cy.get('#country').type('Mexico')
  cy.get('#country').type('Estado de México')
  cy.get('#city').type('Edo mex')
  cy.get('#street2Del').type('mexico')
  cy.get('#street2Del').type('Alvaro Obregon')
  cy.get('#streetNumber').type('323')
  cy.get('#streetNumber2').type('32332')
  cy.get('button.btn.primary.mb-1.w-100').click();
  cy.get('.row > :nth-child(2) > .btn').click()
  cy.get('.text-justify').should('contain', 'Se está procesando tu solicitud, por favor no cierres, refresques la página ni regreses a la página anterior.');
  cy.wait(6000)

    });
  });


            it('Validar la transacción pagada', () => {
                cy.request({
                  method: 'GET',
                  url: baseurl+'/api/transaction/responsemaster/'+transactionNumber,
                }).then((response) => {
                  if(response.body.status == 'Accepted'){
        
               cy.log('La transacción '+transactionNumber+' se pago con exito')
                } else {
                  throw new Error('El estatus de la transacción es incorrecto, es: '+response.body.status);
      
            }
            
              })
            
              })

    

     });


