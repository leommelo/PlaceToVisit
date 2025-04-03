describe('template spec', () => {
    it('País Vazio', () => {
      cy.visit('http://localhost:5173');
  
      cy.get('[data-cy="botao-form"]').click();
  
      cy.get('[data-cy="snackbar-form"]').contains('Escolha um país');

    });

    it('Local Vazio', () => {
        cy.intercept('GET', 'https://restcountries.com/v3.1/all').as('getCountries');
        cy.visit('http://localhost:5173');
    
        cy.wait('@getCountries')
        cy.get('[data-cy="select-form"]').select(1);
        cy.get('[data-cy="botao-form"]').click();
    
        cy.get('[data-cy="snackbar-form"]').contains('Escreva um local');
  
      });

      it('Data inválida', () => {
        cy.intercept('GET', 'https://restcountries.com/v3.1/all').as('getCountries');
        cy.visit('http://localhost:5173');
    
        cy.wait('@getCountries')
        cy.get('[data-cy="select-form"]').select(1);
        cy.get('[data-cy="input-local-form"]').type("Teste Cypress");
        cy.get('[data-cy="input-meta-form"]').type("12202");
        cy.get('[data-cy="botao-form"]').click();
    
        cy.get('[data-cy="snackbar-form"]').contains('Formato de data inválido');
  
      });

      it('Data no passado', () => {
        cy.intercept('GET', 'https://restcountries.com/v3.1/all').as('getCountries');
        cy.visit('http://localhost:5173');
    
        cy.wait('@getCountries')
        cy.get('[data-cy="select-form"]').select(1);
        cy.get('[data-cy="input-local-form"]').type("Teste Cypress");
        cy.get('[data-cy="input-meta-form"]').type("122000");
        cy.get('[data-cy="botao-form"]').click();
    
        cy.get('[data-cy="snackbar-form"]').contains('A data deve estar no futuro');
  
      });
  })