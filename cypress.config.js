const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    userDash: 'QA_DB',
    passDash: 'Ab123456$',
    baseUrlDash:'https://appredpaydashboarddev.azurewebsites.net/',
    baseUrl: 'https://appredpayapiclientmxdev.azurewebsites.net',
    username: "c5239a0a-dd5a-48f6-9600-dea9d983cd5f",
    password: "6858y7#5nV",
    email: "PruebascMiguel@gmail.com",
    companyDash:'TehuacanTest'
    
  // "stage":{

  //   baseUrl: 'https://example.com',
  //   username: "c5239a0a-dd5a-48f6-9600-dea9d983cd5f",
  //   password: "6858y7#5nV"
  // },
  // "prod":{

  //   baseUrl: 'https://example.com',
  //   username: "c5239a0a-dd5a-48f6-9600-dea9d983cd5f",
  //   password: "6858y7#5nV"
  // }

  },
  projectId: "xsu7rb",
  chromeWebSecurity: false,  
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      
    },
  },
});
