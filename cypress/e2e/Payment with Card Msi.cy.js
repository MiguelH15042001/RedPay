 let urlRedirect;
    let transactionNumber;
    const email = Cypress.env('email')
    const baseurl = Cypress.env('baseUrl')
    const password = Cypress.env('password')
    const username = Cypress.env('username')
    
    let amountNumber = Math.floor(Math.random() * (10000 - 1001 + 1)) + 1001;
    let valoresPosibles = [3, 6, 9, 12];
    let indiceAleatorio = Math.floor(Math.random() * valoresPosibles.length);
    let CantidadMsi = valoresPosibles[indiceAleatorio];
    let pagomsi = amountNumber / CantidadMsi
    pagomsi = pagomsi.toFixed(4)
    
      
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
        Amount: amountNumber,
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
        SpecialOffer:{
          "IsInstallment" : true,
        "InstallmentCount" : CantidadMsi //3,6,9,12
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
        cy.log('El saldo es: '+amountNumber+ ' a ' +CantidadMsi+' meses sin intereses')

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
       if (response.body.status === 'Accepted') {
        expect(response.body.transactionNumber).to.eq(transactionNumber)
        expect(response.body.specialOfferInfo.installment).to.include(CantidadMsi);
        cy.log('El total de pago es: '+amountNumber)
        expect(response.body.specialOfferInfo.amount.toFixed(4)).to.eq(pagomsi);
        cy.log('El pago mensual de la transacción es: '+pagomsi+ ' durante: '+CantidadMsi+' meses' )

      } else {
        // Manejar el caso en el que la información de la oferta especial no esté presente en la respuesta
        throw new Error('El estatus de la transacción es incorrecto, es: '+response.body.status);

      }
      
  
      })
    })