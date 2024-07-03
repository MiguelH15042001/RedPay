describe('Reversar una autorización', () => {

    let urlRedirect;
    let transactionNumber;
    const email = 'miguelpc@gmail.com';
    // Autenticación básica (username y password)
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
        Amount: 6,
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
        PaymentProcess:{
            "IsTwoStepPay":true
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
         urlRedirect = response.body.urlRedirect;
         transactionNumber = response.body.transactionNumber;
        cy.log('El transactionNumber es: '+transactionNumber)
        cy.visit(urlRedirect)
        cy.get('.text-justify').should('contain', 'Se está procesando tu solicitud, por favor no cierres, refresques la página ni regreses a la página anterior.');
        cy.wait(6000)
      });
    });
    
    
    it('Validar la transacción pagada', () => {
      cy.request({
        method: 'GET',
        url: baseurl+'/api/transaction/responsemaster/'+transactionNumber,
      }).then((response) => {
      if(response.body.status === 'Authorized'){
        expect(response.body.transactionNumber).to.eq(transactionNumber)
      cy.log('La transacción '+transactionNumber+' se pago con exito')
    } else {
      throw new Error('El estatus de la transacción es incorrecto, es: '+response.body.status);
    }
  
      })
    })

    it('Reversar la transaction', () => {
        let revData={
            TransactionNumber: transactionNumber,
            //Opcional
            Reason: "Razon cualquiera "
        }

        cy.request({
          method: 'POST',
          body: revData,
          auth: {
            username: username,
            password: password
          },
          url: baseurl+'/api/pay/cancel',
        }).then((response) => {

      if(response.body.status == 'Reversed'){
        expect(response.body.transactionNumber).to.eq(transactionNumber)
        cy.log('La transacción '+transactionNumber+' se pago con exito')
      } else {
        throw new Error('El estatus de la transacción es incorrecto, es: '+response.body.status);
      }
    
        })
      })


    

})