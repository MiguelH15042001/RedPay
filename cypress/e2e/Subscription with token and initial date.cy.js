// describe('Subscription with token and initial token', () => {
//     let urlRedirect;
//     let transactionNumber;
//     let randomId
//     const email = Cypress.env('email')
//     const password = Cypress.env('password')
//     const username = Cypress.env('username')
//     const baseurl = Cypress.env('baseUrl')

//     let today = new Date()
//     let todayDay = today.getDate();

//     let randomDay = Math.floor(Math.random() * (28 - todayDay)) + todayDay + 1;

//     let month = today.getMonth()+1
//     let year = today.getFullYear();
    
//         if (randomDay < 10) {
//             day = '0' + day;
//           }
//           if (month < 10) {
//             month = '0' + month;
//           }
//     let DateP = `${randomDay}/${month}/${year}`

    
//   it('Creación de suscripción Daily', ()  => {
//     //Obtener un token de tarjeta
//     cy.request({
//     method:'GET',
//     url:baseurl+'/api/CustomerCardIdentifiers/'+email+'/list',
//     auth: {
//       username: username,
//       password: password
//     }
//   }).then(response =>   {
//     const allIds = response.body.customerCardIdentifiers.map(item => item.id);
//          expect(allIds.length).to.be.greaterThan(0);
//         randomId = allIds[Math.floor(Math.random() * allIds.length)];
//          cy.log(`El card token seleccionado es: ${randomId}`);

//     }).then(() => {
//     let randomNumber = Math.floor(Math.random() * 900000) + 100000;
//     let postData = {

//         ReferenceNumber: randomNumber,
//         Amount:1001.00,
//         Currency:"MXN",
//         Email: email,
//         PaymentProcess:{
//             Subscription:{
//                 Frequency:"Daily", //Daily//Biweekly//Monthly//Annual//Halfyearly
//                 FirstPaymentDate: DateP

//             }      
//           },
//         CustomerCardIdentifier:{
//             Id:randomId
//         }
//     }

//     cy.request({
//         method: 'POST',
//         url: baseurl+'/api/pay/create',
//         body: postData,
//         auth: {
//           username: username,
//           password: password
//         }
//       }).then((response) => {
//         // Verificar que la solicitud se haya realizado correctamente
//         //cy.log('Datos del objeto:', JSON.stringify(response.body));
//         cy.log('Datos del objeto:', JSON.stringify(response.body));

//         urlRedirect = response.body.urlRedirect;
//         transactionNumber = response.body.transactionNumber;
//         cy.log('El transactionNumber es: '+transactionNumber)
//         cy.log(JSON.stringify(postData));
//         cy.visit(urlRedirect)
//         cy.get('.text-justify').should('contain', 'Se está procesando tu solicitud, por favor no cierres, refresques la página ni regreses a la página anterior.');
//         cy.wait(6000)
  
//       });
//     });
//   })
  
//     it('Validar Subscripcion de Daily', () => {

//         cy.request({
//           method: 'GET',
//           url: baseurl+'/api/transaction/responsemaster/'+transactionNumber,
//         }).then((response) => {
//         if(response.body.status==='Accepted'){
//           expect(response.body.paymentProcess.subscriptionId).to.eq(transactionNumber);
//           expect(response.body.paymentProcess.nextPaymentDate).to.include(DateP)
//           cy.log('La transacción '+transactionNumber+' se pago con exito')
//       } else {
//         throw new Error('El estatus de la transacción es incorrecto, es: '+response.body.status);

//       }
//     })
// })


//   //Suscripción Biweekly
//   it('Creación de la subscripcion Biweekly', () => {
//     cy.request({
//       method:'GET',
//       url:baseurl+'/api/CustomerCardIdentifiers/'+email+'/list',
//       auth: {
//         username: username,
//         password: password
//       }
//     }).then(response =>   {
//       const allIds = response.body.customerCardIdentifiers.map(item => item.id);
//            expect(allIds.length).to.be.greaterThan(0);
//           randomId = allIds[Math.floor(Math.random() * allIds.length)];
//            cy.log(`El card token seleccionado es: ${randomId}`);
  
//       }).then(() => {
//       let randomNumber = Math.floor(Math.random() * 900000) + 100000;
//       let postData = {
  
//           ReferenceNumber: randomNumber,
//           Amount:1001.00,
//           Currency:"MXN",
//           Email: email,
//           PaymentProcess:{
//             Subscription:{
//                 Frequency:"Biweekly", //Daily//Biweekly//Monthly//Annual//Halfyearly
//                 FirstPaymentDate: DateP
//             }   
//              },
//           CustomerCardIdentifier:{
//               Id:randomId
//           }
//       }
  
//       cy.request({
//           method: 'POST',
//           url: baseurl+'/api/pay/create',
//           body: postData,
//           auth: {
//             username: username,
//             password: password
//           }
//         }).then((response) => {
//           // Verificar que la solicitud se haya realizado correctamente
//           //cy.log('Datos del objeto:', JSON.stringify(response.body));
//           cy.log('Datos del objeto:', JSON.stringify(response.body));
  
//            urlRedirect = response.body.urlRedirect;
//            transactionNumber = response.body.transactionNumber;
//           cy.log('El transactionNumber es: '+transactionNumber)
//           cy.log(JSON.stringify(postData));
//           cy.visit(urlRedirect)
//           cy.get('.text-justify').should('contain', 'Se está procesando tu solicitud, por favor no cierres, refresques la página ni regreses a la página anterior.');
//           cy.wait(6000)
    
//         });
//       });
//     })
    
  
//   it('Validar Subscripcion de Biweekly', () => {

//     cy.request({
//       method: 'GET',
//       url: baseurl+'/api/transaction/responsemaster/'+transactionNumber,
//     }).then((response) => {
      
//     if(response.body.status ==='Accepted'){
//       expect(response.body.paymentProcess.subscriptionId).to.eq(transactionNumber);
//       expect(response.body.paymentProcess.nextPaymentDate).to.include(DateP)
//       cy.log('La transacción '+transactionNumber+' se pago con exito')
//   } else {
//     throw new Error('El estatus de la transacción es incorrecto, es: '+response.body.status);
//   }

//     })
//   })

//   //Suscripción Monthly  
//   it('Creación de la subscripcion Monthly', () => {
//     cy.request({
//       method:'GET',
//       url:baseurl+'/api/CustomerCardIdentifiers/'+email+'/list',
//       auth: {
//         username: username,
//         password: password
//       }
//     }).then(response =>   {
//       const allIds = response.body.customerCardIdentifiers.map(item => item.id);
//            expect(allIds.length).to.be.greaterThan(0);
//           randomId = allIds[Math.floor(Math.random() * allIds.length)];
//            cy.log(`El card token seleccionado es: ${randomId}`);
  
//       }).then(() => {
//       let randomNumber = Math.floor(Math.random() * 900000) + 100000;
//       let postData = {
  
//         ReferenceNumber: randomNumber,
//         Amount:1001.00,
//         Currency:"MXN",
//         Email: email,
//         PaymentProcess:{
//           Subscription:{
//               Frequency:"Monthly", //Daily//Biweekly//Monthly//Annual//Halfyearly
//               FirstPaymentDate: DateP

//             }         
//        },
//         CustomerCardIdentifier:{
//             Id:randomId
//         }
//       }
  
//       cy.request({
//           method: 'POST',
//           url: baseurl+'/api/pay/create',
//           body: postData,
//           auth: {
//             username: username,
//             password: password
//           }
//         }).then((response) => {
//           // Verificar que la solicitud se haya realizado correctamente
//           //cy.log('Datos del objeto:', JSON.stringify(response.body));
//           cy.log('Datos del objeto:', JSON.stringify(response.body));
  
//            urlRedirect = response.body.urlRedirect;
//            transactionNumber = response.body.transactionNumber;
//           cy.log('El transactionNumber es: '+transactionNumber)
//           cy.log(JSON.stringify(postData));
//           cy.visit({ 
//             url: urlRedirect
//           })
//               cy.get('.text-justify').should('contain', 'Se está procesando tu solicitud, por favor no cierres, refresques la página ni regreses a la página anterior.');
//           cy.wait(6000)
    
//         });
//       });
//   });

  
//   it('Validar Subscripcion de Monthly', () => {
//     cy.request({
//       method: 'GET',
//       url: baseurl+'/api/transaction/responsemaster/'+transactionNumber,
//     }).then((response) => {
//           if(response.body.status ==='Accepted'){
//       expect(response.body.paymentProcess.subscriptionId).to.eq(transactionNumber);
//       expect(response.body.paymentProcess.nextPaymentDate).to.include(DateP)
//       cy.log('La transacción '+transactionNumber+' se pago con exito')
//   } else {
//     throw new Error('El estatus de la transacción es incorrecto, es: '+response.body.status);

//   }

//     })
//   })


//   //Annual
//   it('Creación de la subscripcion Annual', () => {
//     cy.request({
//       method:'GET',
//       url:baseurl+'/api/CustomerCardIdentifiers/'+email+'/list',
//       auth: {
//         username: username,
//         password: password
//       }
//     }).then(response =>   {
//       const allIds = response.body.customerCardIdentifiers.map(item => item.id);
//            expect(allIds.length).to.be.greaterThan(0);
//           randomId = allIds[Math.floor(Math.random() * allIds.length)];
//            cy.log(`El card token seleccionado es: ${randomId}`);
  
//       }).then(() => {
//       let randomNumber = Math.floor(Math.random() * 900000) + 100000;
//       let postData = {
  
//           ReferenceNumber: randomNumber,
//           Amount:1001.00,
//           Currency:"MXN",
//           Email: email,
//           PaymentProcess:{
//             Subscription:{
//                 Frequency:"Annual", //Daily//Biweekly//Monthly//Annual//Halfyearly
//                 FirstPaymentDate: DateP

//             }         
//          },
//           CustomerCardIdentifier:{
//               Id:randomId
//           }
//       }
  
//       cy.request({
//           method: 'POST',
//           url: baseurl+'/api/pay/create',
//           body: postData,
//           auth: {
//             username: username,
//             password: password
//           }
//         }).then((response) => {
//           // Verificar que la solicitud se haya realizado correctamente
//           //cy.log('Datos del objeto:', JSON.stringify(response.body));
//           cy.log('Datos del objeto:', JSON.stringify(response.body));
  
//            urlRedirect = response.body.urlRedirect;
//            transactionNumber = response.body.transactionNumber;
//           cy.log('El transactionNumber es: '+transactionNumber)
//           cy.log(JSON.stringify(postData));
//           cy.visit({ 
//             url: urlRedirect
//           })
//               cy.get('.text-justify').should('contain', 'Se está procesando tu solicitud, por favor no cierres, refresques la página ni regreses a la página anterior.');
//           cy.wait(6000)
    
//         });
//       });
//     })
  
  
//   it('Validar Subscripcion de Annual', () => {

//     cy.request({
//       method: 'GET',
//       url: baseurl+'/api/transaction/responsemaster/'+transactionNumber,
//     }).then((response) => {
      
//     if(response.body.status==='Accepted'){
//       expect(response.body.paymentProcess.subscriptionId).to.eq(transactionNumber);
//       expect(response.body.paymentProcess.nextPaymentDate).to.include(DateP)
//       cy.log('La transacción '+transactionNumber+' se pago con exito')
//   } else {
//     throw new Error('El estatus de la transacción es incorrecto, es: '+response.body.status);
//   }

//     })
//   })


//   //Halfyearly
//   it('Creación de la subscripcion HalfYearly', () => {
//     cy.request({
//       method:'GET',
//       url:baseurl+'/api/CustomerCardIdentifiers/'+email+'/list',
//       auth: {
//         username: username,
//         password: password
//       }
//     }).then(response =>   {
//       const allIds = response.body.customerCardIdentifiers.map(item => item.id);
//            expect(allIds.length).to.be.greaterThan(0);
//           randomId = allIds[Math.floor(Math.random() * allIds.length)];
//            cy.log(`El card token seleccionado es: ${randomId}`);
  
//       }).then(() => {
//       let randomNumber = Math.floor(Math.random() * 900000) + 100000;
//       let postData = {
  
//           ReferenceNumber: randomNumber,
//           Amount:1001.00,
//           Currency:"MXN",
//           Email: email,
//           PaymentProcess:{
//             Subscription:{
//                 Frequency:"HalfYearly", //Daily//Biweekly//Monthly//Annual//Halfyearly
//                 FirstPaymentDate: DateP

//             }
//         },
//           CustomerCardIdentifier:{
//               Id:randomId
//           }
//       }
  
//       cy.request({
//           method: 'POST',
//           url: baseurl+'/api/pay/create',
//           body: postData,
//           auth: {
//             username: username,
//             password: password
//           }
//         }).then((response) => {
//           // Verificar que la solicitud se haya realizado correctamente
//           cy.log('Datos del objeto:', JSON.stringify(response.body));
  
//            urlRedirect = response.body.urlRedirect;
//            transactionNumber = response.body.transactionNumber;
//           cy.log('El transactionNumber es: '+transactionNumber)
//           cy.log(JSON.stringify(postData));
//           cy.visit(urlRedirect)
//           cy.get('.text-justify').should('contain', 'Se está procesando tu solicitud, por favor no cierres, refresques la página ni regreses a la página anterior.');
//           cy.wait(6000)
    
//         });
//       });
//     })

  
  
//   it('Validar Subscripcion de Halfyearly', () => {

//     cy.request({
//       method: 'GET',
//       url: baseurl+'/api/transaction/responsemaster/'+transactionNumber,
//     }).then((response) => {
      
//     if(response.body.status==='Accepted'){
//       expect(response.body.paymentProcess.subscriptionId).to.eq(transactionNumber);
//       expect(response.body.paymentProcess.nextPaymentDate).to.include(DateP)
//       expect(response.body.status).to.eq('Accepted');

//     cy.log('La transacción '+transactionNumber+' se pago con exito')
//   } else {
//         throw new Error('El estatus de la transacción es incorrecto, es: '+response.body.status);
//   }

//     })
//   })
  


// })
 