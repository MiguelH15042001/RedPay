describe('Payment with Card and create token', () => {

    let urlRedirect;
    let transactionNumber;
    let id;
    const email = Cypress.env('email')
    const password = Cypress.env('password')
    const username = Cypress.env('username')
    const baseurl = Cypress.env('baseUrl')

   
   
    it('Creación de la transacción', () => {
      let randomNumber = Math.floor(Math.random() * 900000) + 100000;
  
      // Datos para la solicitud POST
        let postData = {
        CardNumber: "4242424242424242",
        CardExpirationMonth: "01",
        CardExpirationYear: "2027",
        Cvv: "175",
        CardType: "001",
        ReferenceNumber: randomNumber, 
        Amount: 1001,
        Currency: "MXN",
        FirstName: "Miguel c",
        LastName: "Hernandez c",
        Email: email,
        PhoneNumber: "2381641341",
        Country: "Mexico",
        State: "Estado de México",
        City: "Tehuacan",
        PostalCode: "54880",
        Street: "Imbiras",
        StreetNumber: "2347",
        StreetNumber2: "S/N",
        Street2Col: "Fraccionamiento Rancho Grande",
        StreetDel: "Tehu",
        customerCardIdentifier:{
            "create":true
         }
      };
  
  
      // Realizar la solicitud POST 
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
        cy.log('El transactionNumber es: '+transactionNumber)
        cy.visit(urlRedirect)
        cy.get('.text-justify').should('contain', 'Se está procesando tu solicitud, por favor no cierres, refresques la página ni regreses a la página anterior.');
        cy.wait(6000)
      }).catch((error) => {
        cy.log('Error al procesar la solicitud:', error.message);
      });
    });
    
    
    it('Validar la transacción pagada', () => {
      cy.request({
        method: 'GET',
        url: baseurl+'/api/transaction/responsemaster/'+transactionNumber,
      }).then((response) => {
      id = response.body.customerCardIdentifier.id;
      if(response.body.status ==='Accepted'){
        expect(response.body.transactionNumber).to.eq(transactionNumber)
      cy.log('La transacción '+transactionNumber+' se pago con exito')
      cy.log('El token es: '+id)
    } else {
      throw new Error('El estatus de la transacción es incorrecto, es: '+response.body.status);
    }
  
      }).catch((error) => {
        cy.log('Error al procesar la solicitud:', error.message);
      });
    })

    it('Validar creación de token', () => {
        cy.request({
            method:'GET',
            auth: {
                username: username,
                password: password
              },
            url: baseurl+'/api/CustomerCardIdentifiers/'+email+'/list',
            
        }).then((response) => {
        if(response.body.customerCardIdentifiers){
        expect(response.body.customerCardIdentifiers.some(identifier => identifier.id === id)).to.be.true;
        cy.log('El token:  '+id+ ' Se encuentra en la lista ')
      } else {
        throw new Error('No se encuentra el token registrado');
      }
        }).catch((error) => {
          cy.log('Error al procesar la solicitud:', error.message);
        });

    })
  
  
  
  });
  