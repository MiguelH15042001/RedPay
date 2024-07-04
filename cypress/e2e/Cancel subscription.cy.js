describe('Cancel subscription', () => {
    let urlRedirect;
    let transactionN;
    const email = Cypress.env('email')
    const password = Cypress.env('password')
    const username = Cypress.env('username')
    const baseurl = Cypress.env('baseUrl')

    let Freq = ["Daily", "Biweekly", "Monthly", "Annual", "Halfyearly"];
    let Freqrandom = Math.floor(Math.random() * Freq.length);
    let randomPeriod = Freq[Freqrandom];


    it('Creación de una suscripción random', () => {
      let randomNumber = Math.floor(Math.random() * 900000) + 100000;
  
      // Datos para la solicitud POST
        let postData = {
          CardNumber:"4242424242424242", // 
          CardExpirationMonth:"01",
          CardExpirationYear:"2027",
          Cvv:"175",
          CardType:"001", //
          ReferenceNumber:randomNumber,
          Amount:1001,
          Currency:"MXN",
          FirstName:"Miguel",
          LastName:"Angel",
          Email: email,
          PhoneNumber:"",
          Street:"pablo neruda",
          StreetNumber:"7",
          StreetNumber2:"s/n",
          Street2Col:"Torresco",
          Street2Del:"Melchor Ocampo",
          City:"Melchor Ocampo",
          State:"Estado de Mexico",
          Country:"Mexico",
          PostalCode:"03400",
          PaymentProcess:{
              Subscription:{
                  Frequency:randomPeriod //Daily//Biweekly//Monthly//Annual//Halfyearly
              }
          }
      }
  
      // Realizar la solicitud POST 
      cy.request({
        method: 'POST',
        url: baseurl+'/api/pay/Create',
        body: postData,
        auth: {
          username: username,
          password: password
        }
      }).then((response) => {
        // Verificar que la solicitud se haya realizado correctamente
        cy.log('Datos del objeto:', JSON.stringify(response.body));
        cy.log(JSON.stringify(postData));
         urlRedirect = response.body.urlRedirect;
         transactionN = response.body.transactionNumber;
        cy.log('El transactionNumber es: '+transactionN)
        cy.visit(urlRedirect)
        cy.get('.text-justify').should('contain', 'Se está procesando tu solicitud, por favor no cierres, refresques la página ni regreses a la página anterior.');
        cy.wait(7000)
      }).catch((error) => {
        cy.log('Error al procesar la solicitud:', error.message);
      });
    });


    it('Validar Subscripcion', () => {
        cy.request({
          method: 'GET',
          url: baseurl+'/api/transaction/responsemaster/'+transactionN,
        }).then((response) => {
  
        if(response.body.status === 'Accepted'){
          expect(response.body.paymentProcess.subscriptionId).to.eq(transactionN);
          cy.log('El tipo de suscripción es:' +randomPeriod)

  
        cy.log('La transacción '+transactionN+' se pago con exito')
      } else {
        throw new Error('El estatus de la transacción es incorrecto, es: '+response.body.status);

      }
    }).catch((error) => {
      cy.log('Error al procesar la solicitud:', error.message);
    });
})


it('Cancelar Subscripcion', () => {
    let transactionCancel = {
    TransactionNumber: transactionN
    }
    cy.request({
        method: 'POST',
        url: baseurl+'/api/pay/CancelSubscription',
        body: transactionCancel,
        auth: {
          username: username,
          password: password
        }
    }).then((response) => {
     
        if(response.body.status === 'SubscriptionCanceled'){
          expect(response.body.paymentProcess.subscriptionId).to.eq(transactionN)
  
        cy.log('La transacción '+transactionN+' se cancelo con exito')
      } else {
        throw new Error('El estatus de la transacción es incorrecto, es: '+response.body.status);

      }
  
      }).catch((error) => {
        cy.log('Error al procesar la solicitud:', error.message);
      });
    })


    })




