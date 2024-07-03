describe('Payment Refund', () => {

    let urlRedirect;
    let transactionNumber;
    let transactionCode
    const password = Cypress.env('password')
    const username = Cypress.env('username')
    const baseurl = Cypress.env('baseUrl')
    const email = Cypress.env('email')


    let AmountRandom = Math.floor(Math.random() * 9000) + 1000;

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
        Amount: AmountRandom,
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
        StreetDel: "Tehu"
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
         cy.log('Valor de urlRedirect:', urlRedirect);
         cy.visit(urlRedirect)
         cy.get('.text-justify').should('contain', 'Se está procesando tu solicitud, por favor no cierres, refresques la página ni regreses a la página anterior.');  
         cy.wait(6000)    
         transactionCode = response.body.transactionCode

      });
      
  
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

    it('Hacer refund la transaction', () => {
        let RefData={
            Transactioncode : transactionCode,
            Amount : AmountRandom
        }
        cy.request({
          method: 'POST',
          body:RefData,
          auth:{
          username: username,
          password: password
          },
          url: baseurl+'/api/pay/refund',
        }).then((response) => {
        if(response.body.status === 'Refund'){
        expect(response.body.transactionCode).to.eq(transactionCode)
        cy.log('La transacción '+transactionNumber+' se pago con exito')
      } else {
        throw new Error('El estatus de la transacción es incorrecto, es: '+response.body.status);
      }
    
      })
    
      })


  
  });
  