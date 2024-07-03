describe('Subscription with token V2', () => {
    let urlRedirect;
    let transactionNumber;
    let randomId
    const email = 'miguelpc@gmail.com'
    const password = Cypress.env('password')
    const username = Cypress.env('username')
    const baseurl = Cypress.env('baseUrl')

    let today = new Date()
    
  it('Creación de suscripción Daily', () => {
    //Obtener un token de tarjeta
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
         randomId = allIds[Math.floor(Math.random() * allIds.length)];
         cy.log(`El card token seleccionado es: ${randomId}`);

    }).then(() => {
    let randomNumber = Math.floor(Math.random() * 900000) + 100000;
    let postData = {

        ReferenceNumber: randomNumber,
        Amount:5.00,
        Currency:"MXN",
        Email: email,
        PaymentProcess:{
            Subscription:{
                Frequency:"Daily" //Daily//Biweekly//Monthly//Annual//Halfyearly
            }        },
        CustomerCardIdentifier:{
            Id:randomId
        }
    }

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
        urlRedirect = response.body.urlRedirect;
        transactionNumber = response.body.transactionNumber;
        cy.log('El transactionNumber es: '+transactionNumber)
        cy.log(JSON.stringify(postData));
        cy.visit(urlRedirect)
        cy.get('.text-justify').should('contain', 'Se está procesando tu solicitud, por favor no cierres, refresques la página ni regreses a la página anterior.');
        cy.wait(6000)
      });
    });
  })
  

    it('Validar Subscripcion de Daily', () => {
      let tomorrow = new Date(today);
      tomorrow.setDate(today.getDate()+1);
      let day= tomorrow.getDate()
      let month = tomorrow.getMonth()+1
      let year = tomorrow.getFullYear();
  
      if (day < 10) {
          day = '0' + day;
        }
        if (month < 10) {
          month = '0' + month;
        }
        let tomorrowF = `${day}/${month}/${year}`;
        cy.request({
          method: 'GET',
          url: baseurl+'/api/transaction/responsemaster/'+transactionNumber,
        }).then((response) => {
          cy.log('Datos del objeto:', JSON.stringify(response.body));
          cy.log(tomorrowF)
  
        if(response.body.status==='Accepted'){
          expect(response.body.paymentProcess.subscriptionId).to.eq(transactionNumber);
          expect(response.body.paymentProcess.nextPaymentDate).to.include(tomorrowF)
          cy.log('La transacción '+transactionNumber+' se pago con exito')
      } else {
        cy.log('La transacción no se a pagado correctamente');
        throw new Error('El estatus de la transacción es incorrecto, es: '+response.body.status);

      }
    })
})


  //Suscripción Biweekly
  
  it('Creación de la subscripcion Biweekly', () => {
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
          randomId = allIds[Math.floor(Math.random() * allIds.length)];
           cy.log(`El card token seleccionado es: ${randomId}`);
  
      }).then(() => {
      let randomNumber = Math.floor(Math.random() * 900000) + 100000;
      let postData = {
  
          ReferenceNumber: randomNumber,
          Amount:5.00,
          Currency:"MXN",
          Email: email,
          PaymentProcess:{
            Subscription:{
                Frequency:"Biweekly" //Daily//Biweekly//Monthly//Annual//Halfyearly
            }          },
          CustomerCardIdentifier:{
              Id:randomId
          }
      }
  
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
          //cy.log('Datos del objeto:', JSON.stringify(response.body));
          cy.log('Datos del objeto:', JSON.stringify(response.body));
  
           urlRedirect = response.body.urlRedirect;
           transactionNumber = response.body.transactionNumber;
          cy.log('El transactionNumber es: '+transactionNumber)
          cy.log(JSON.stringify(postData));
          cy.visit(urlRedirect)
          cy.get('.text-justify').should('contain', 'Se está procesando tu solicitud, por favor no cierres, refresques la página ni regreses a la página anterior.');
          cy.wait(6000)
    
        });
      });
    })
    

  
  it('Validar Subscripcion de Biweekly', () => {
    let today = new Date()
    let Biweekly = new Date(today);
    Biweekly.setDate(today.getDate()+14);

    let day = Biweekly.getDate()
    let month = Biweekly.getMonth()+1
    let year = Biweekly.getFullYear();

    if (day < 10) {
        day = '0' + day;
      }
      if (month < 10) {
        month = '0' + month;
      }
      let BiweeklyF = `${day}/${month}/${year}`;


    cy.request({
      method: 'GET',
      url: baseurl+'/api/transaction/responsemaster/'+transactionNumber,
    }).then((response) => {
      
      cy.log(BiweeklyF)  
    if(response.body.status==='Accepted'){
      expect(response.body.paymentProcess.subscriptionId).to.eq(transactionNumber);
      expect(response.body.paymentProcess.nextPaymentDate).to.include(BiweeklyF)
      cy.log('La transacción '+transactionNumber+' se pago con exito')
  } else {
    throw new Error('El estatus de la transacción es incorrecto, es: '+response.body.status);
  }

    })
  })



  //Suscripción Monthly
  
  it('Creación de la subscripcion Monthly', () => {
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
          randomId = allIds[Math.floor(Math.random() * allIds.length)];
           cy.log(`El card token seleccionado es: ${randomId}`);
  
      }).then(() => {
      let randomNumber = Math.floor(Math.random() * 900000) + 100000;
      let postData = {
  
        ReferenceNumber: randomNumber,
        Amount:5.00,
        Currency:"MXN",
        Email: email,
        PaymentProcess:{
          Subscription:{
              Frequency:"Monthly" //Daily//Biweekly//Monthly//Annual//Halfyearly
          }         
       },
        CustomerCardIdentifier:{
            Id:randomId
        }
      }
  
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
          urlRedirect = response.body.urlRedirect;
          transactionNumber = response.body.transactionNumber;
          cy.log('El transactionNumber es: '+transactionNumber)
          cy.log(JSON.stringify(postData));
          cy.visit(urlRedirect)
          cy.get('.text-justify').should('contain', 'Se está procesando tu solicitud, por favor no cierres, refresques la página ni regreses a la página anterior.');
          cy.wait(6000)
    
        });
      });
  });

  
  it('Validar Subscripcion de Monthly', () => {
    let today = new Date()
    let NextMonth = new Date(today);
    NextMonth.setDate(today.getDate()+31);

    let day = NextMonth.getDate()
    let month = NextMonth.getMonth()+1
    let year = NextMonth.getFullYear();

    if (day < 10) {
        day = '0' + day;
      }
      if (month < 10) {
        month = '0' + month;
      }
      let NextMonthF = `${day}/${month}/${year}`;


    cy.request({
      method: 'GET',
      url: baseurl+'/api/transaction/responsemaster/'+transactionNumber,
    }).then((response) => {
      
      cy.log(NextMonthF)  
    if(response.body.status==='Accepted'){
      expect(response.body.paymentProcess.subscriptionId).to.eq(transactionNumber);
      expect(response.body.paymentProcess.nextPaymentDate).to.include(NextMonthF)
      cy.log('La transacción '+transactionNumber+' se pago con exito')
  } else {
    //throw new Error
    throw new Error('El estatus de la transacción es incorrecto, es: '+response.body.status);
  }

    })
  })

  //Annual  
  it('Creación de la subscripcion Annual', () => {
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
          randomId = allIds[Math.floor(Math.random() * allIds.length)];
           cy.log(`El card token seleccionado es: ${randomId}`);
  
      }).then(() => {
      let randomNumber = Math.floor(Math.random() * 900000) + 100000;
      let postData = {
  
          ReferenceNumber: randomNumber,
          Amount:5.00,
          Currency:"MXN",
          Email: email,
          PaymentProcess:{
            Subscription:{
                Frequency:"Annual" //Daily//Biweekly//Monthly//Annual//Halfyearly
            }         
         },
          CustomerCardIdentifier:{
              Id:randomId
          }
      }
  
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
          //cy.log('Datos del objeto:', JSON.stringify(response.body));
          cy.log('Datos del objeto:', JSON.stringify(response.body));
  
           urlRedirect = response.body.urlRedirect;
           transactionNumber = response.body.transactionNumber;
          cy.log('El transactionNumber es: '+transactionNumber)
          cy.log(JSON.stringify(postData));
          cy.visit(urlRedirect)
          cy.get('.text-justify').should('contain', 'Se está procesando tu solicitud, por favor no cierres, refresques la página ni regreses a la página anterior.');
          cy.wait(6000)
    
        });
      });
    })
  
  
  it('Validar Subscripcion de Annual', () => {
    let today = new Date()
    let NextYear = new Date(today);
    NextYear.setDate(today.getDate()+365);

    let day =   NextYear.getDate()
    let month = NextYear.getMonth()+1
    let year =  NextYear.getFullYear();

    if (day < 10) {
        day = '0' + day;
      }
      if (month < 10) {
        month = '0' + month;
      }
      let NextYearF = `${day}/${month}/${year}`;


    cy.request({
      method: 'GET',
      url: baseurl+'/api/transaction/responsemaster/'+transactionNumber,
    }).then((response) => {
      
      cy.log(NextYearF)  
    if(response.body.status==='Accepted'){
      expect(response.body.paymentProcess.subscriptionId).to.eq(transactionNumber);
      expect(response.body.paymentProcess.nextPaymentDate).to.include(NextYearF)
    cy.log('La transacción '+transactionNumber+' se pago con exito')
  } else {
    throw new Error('El estatus de la transacción es incorrecto, es: '+response.body.status);
  }

    })
  })


  //Halfyearly
  it('Creación de la subscripcion HalfYearly', () => {
    cy.request({
      method:'GET',
      url: baseurl+'/api/CustomerCardIdentifiers/'+email+'/list',
      auth: {
        username: username,
        password: password
      }
    }).then(response =>   {
      const allIds = response.body.customerCardIdentifiers.map(item => item.id);
           expect(allIds.length).to.be.greaterThan(0);
          randomId = allIds[Math.floor(Math.random() * allIds.length)];
           cy.log(`El card token seleccionado es: ${randomId}`);
  
      }).then(() => {
      let randomNumber = Math.floor(Math.random() * 900000) + 100000;
      let postData = {
  
          ReferenceNumber: randomNumber,
          Amount:5.00,
          Currency:"MXN",
          Email: email,
          PaymentProcess:{
            Subscription:{
                Frequency:"HalfYearly" //Daily//Biweekly//Monthly//Annual//Halfyearly
            }
        },
          CustomerCardIdentifier:{
              Id:randomId
          }
      }
  
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
          cy.log(JSON.stringify(postData));
          cy.visit(urlRedirect)
          cy.get('.text-justify').should('contain', 'Se está procesando tu solicitud, por favor no cierres, refresques la página ni regreses a la página anterior.');
          cy.wait(6000)
    
        });
      });
    })

  
  
  it('Validar Subscripcion de Halfyearly', () => {
    let today = new Date()
    let NextHalfYear = new Date(today);
    NextHalfYear.setDate(today.getDate()+184);

    let day = NextHalfYear.getDate()
    let month = NextHalfYear.getMonth()+1
    let year = NextHalfYear.getFullYear();

    if (day < 10) {
        day = '0' + day;
      }
      if (month < 10) {
        month = '0' + month;
      }
      let NextHalfYearF = `${day}/${month}/${year}`;


    cy.request({
      method: 'GET',
      url: baseurl+'/api/transaction/responsemaster/'+transactionNumber,
    }).then((response) => {
      
      cy.log(NextHalfYearF)  
    if(response.body.status==='Accepted'){
      expect(response.body.paymentProcess.subscriptionId).to.eq(transactionNumber);
      expect(response.body.paymentProcess.nextPaymentDate).to.include(NextHalfYearF)
      cy.log('La transacción '+transactionNumber+' se pago con exito')
  } else {
    throw new Error('El estatus de la transacción es incorrecto, es: '+response.body.status);
  }

    })
  })
  


})
 