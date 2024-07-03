describe('Subscription with card and initial date', () => {

    let urlRedirect;
    let transactionNumber;
    const email = Cypress.env('email')
    const password = Cypress.env('password')
    const username = Cypress.env('username')
    const baseurl = Cypress.env('baseUrl')

    let today = new Date()

    let todayDay = today.getDate();

    let randomDay = Math.floor(Math.random() * (28 - todayDay)) + todayDay + 1;

    let month = today.getMonth()+1
    let year = today.getFullYear();
      if (randomDay < 10) {
            day = '0' + day;
          }
      if (month < 10) {
            month = '0' + month;
          }
    let DateP = `${randomDay}/${month}/${year}`

    it('Creación de la suscripcion Daily', () => {
      let randomNumber = Math.floor(Math.random() * 900000) + 100000;        
      // Datos para la solicitud POST
        let postData = {
          CardNumber:"4242424242424242", //
          CardExpirationMonth:"01",
          CardExpirationYear:"2027",
          Cvv:"175",
          CardType:"001", //
          ReferenceNumber:randomNumber,
          Amount:6.00,
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
                  Frequency:"Daily", //Daily//Biweekly//Monthly//Annual//Halfyearly
                  FirstPaymentDate: DateP
              }
          }
      }
  
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
        cy.log('Datos del objeto:', JSON.stringify(response.body));

        cy.log('Random dia'+DateP)
        urlRedirect = response.body.urlRedirect;
        transactionNumber = response.body.transactionNumber;
        cy.log('El transactionNumber es: '+transactionNumber)
        cy.visit(urlRedirect)
        cy.get('.text-justify').should('contain', 'Se está procesando tu solicitud, por favor no cierres, refresques la página ni regreses a la página anterior.');
        cy.wait(6000)
      });
    });
    
    
    it('Validar Subscripcion de Daily', () => {

      cy.request({
        method: 'GET',
        url: baseurl+'/api/transaction/responsemaster/'+transactionNumber,
      }).then((response) => {
        cy.log('Datos del objeto:', JSON.stringify(response.body));

      if(response.body.status ==='Accepted'){
        expect(response.body.paymentProcess.subscriptionId).to.eq(transactionNumber);
        expect(response.body.paymentProcess.nextPaymentDate).to.eq(DateP)
        cy.log('La transacción '+transactionNumber+' se pago con exito')
    } else {
      throw new Error('El estatus de la transacción es incorrecto, es: '+response.body.status);
    }
  
      })
    })


    it('Creación de la subscripcion Biweekly', () => {
        let randomNumber = Math.floor(Math.random() * 900000) + 100000;
              // Datos para la solicitud POST
          let postData = {
            CardNumber:"4242424242424242", //
            CardExpirationMonth:"01",
            CardExpirationYear:"2027",
            Cvv:"175",
            CardType:"001", //
            ReferenceNumber:randomNumber,
            Amount:6.00,
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
                    Frequency:"Biweekly", //Daily//Biweekly//Monthly//Annual//Halfyearly
                    FirstPaymentDate: DateP

                }
            }
        }
    
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
      
      
      it('Validar Subscripcion de Biweekly', () => {

        cy.request({
          method: 'GET',
          url: baseurl+'/api/transaction/responsemaster/'+transactionNumber,
        }).then((response) => {
          if(response.body.status === 'Accepted'){
          expect(response.body.paymentProcess.subscriptionId).to.eq(transactionNumber);
          expect(response.body.paymentProcess.nextPaymentDate).to.include(DateP)
  
        cy.log('La transacción '+transactionNumber+' se pago con exito')
      } else {
        throw new Error('El estatus de la transacción es incorrecto, es: '+response.body.status);
      }
    
        })
      })

      it('Creación de la subscripcion Monthly', () => {
        let randomNumber = Math.floor(Math.random() * 900000) + 100000;
              // Datos para la solicitud POST
              let postData = {
                CardNumber:"4242424242424242", //
                CardExpirationMonth:"01",
                CardExpirationYear:"2027",
                Cvv:"175",
                CardType:"001", //
                ReferenceNumber:randomNumber,
                Amount:6.00,
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
                        Frequency:"Monthly", //Daily//Biweekly//Monthly//Annual//Halfyearly
                        FirstPaymentDate: DateP
                    }
                }
            }
    
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
      
      it('Validar Subscripcion de Monthly', () => {
        cy.request({
          method: 'GET',
          url: baseurl+'/api/transaction/responsemaster/'+transactionNumber,
        }).then((response) => {
          if(response.body.status ==='Accepted'){
          expect(response.body.paymentProcess.subscriptionId).to.eq(transactionNumber);
          expect(response.body.paymentProcess.nextPaymentDate).to.include(DateP)
  
        cy.log('La transacción '+transactionNumber+' se pago con exito')
      } else {
        throw new Error('El estatus de la transacción es incorrecto, es: '+response.body.status);
      }
    
        })
      })



      
      it('Creación de la subscripcion Annual', () => {
        let randomNumber = Math.floor(Math.random() * 900000) + 100000;
              // Datos para la solicitud POST
              let postData = {
                CardNumber:"4242424242424242", //
                CardExpirationMonth:"01",
                CardExpirationYear:"2027",
                Cvv:"175",
                CardType:"001", //
                ReferenceNumber:randomNumber,
                Amount:6.00,
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
                        Frequency:"Annual", //Daily//Biweekly//Monthly//Annual//Halfyearly
                        FirstPaymentDate: DateP

                    }
                }
            }
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
  
        
      it('Validar Subscripcion de Annual', () => {
        cy.request({
          method: 'GET',
          url: baseurl+'/api/transaction/responsemaster/'+transactionNumber,
        }).then((response) => {
          if(response.body.status ==='Accepted'){
          expect(response.body.paymentProcess.subscriptionId).to.eq(transactionNumber);
          expect(response.body.paymentProcess.nextPaymentDate).to.include(DateP)
          cy.log('La transacción '+transactionNumber+' se pago con exito')
      } else {
        throw new Error('El estatus de la transacción es incorrecto, es: '+response.body.status);
      }
    
        })
      })

      it('Creación de la subscripcion HalfYearly', () => {
        let randomNumber = Math.floor(Math.random() * 900000) + 100000;
              // Datos para la solicitud POST
              let postData = {
                CardNumber:"4242424242424242", //
                CardExpirationMonth:"01",
                CardExpirationYear:"2027",
                Cvv:"175",
                CardType:"001", //
                ReferenceNumber:randomNumber,
                Amount:6.00,
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
                        Frequency:"Halfyearly", //Daily//Biweekly//Monthly//Annual//Halfyearly
                        FirstPaymentDate: DateP

                    }
                }
            }
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
      
      it('Validar Subscripcion de Halfyearly', () => {
        cy.request({
          method: 'GET',
          url: baseurl+'/api/transaction/responsemaster/'+transactionNumber,
        }).then((response) => {
          if(response.body.status === 'Accepted'){
          expect(response.body.paymentProcess.subscriptionId).to.eq(transactionNumber);
          expect(response.body.paymentProcess.nextPaymentDate).to.include(DateP)  
          cy.log('La transacción '+transactionNumber+' se pago con exito')
      } else {
        throw new Error('El estatus de la transacción es incorrecto, es: '+response.body.status);
      }
    
        })
      })
      

  });
  