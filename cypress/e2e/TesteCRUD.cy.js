describe('template spec', () => {
  it('Adiciona uma nova meta', () => {
    cy.intercept('GET', 'https://restcountries.com/v3.1/all').as('getCountries');
    cy.visit('http://localhost:5173');

    cy.wait('@getCountries')
    cy.get('[data-cy="select-form"]').select(1);
    cy.get('[data-cy="input-local-form"]').type("Teste Cypress");
    cy.get('[data-cy="input-meta-form"]').type("122026");
    cy.get('[data-cy="botao-form"]').click();

    cy.get('[data-cy="snackbar-form"]').contains('Meta adicionada com sucesso');

    cy.wait(1000);
    cy.get('[data-cy="card"]').last().contains('Teste Cypress');
  });

  it('Edita a meta criada', () => {
    cy.visit('http://localhost:5173');

    cy.contains('[data-cy="card"]', 'Teste Cypress') // Encontra o card certo
    .find('[data-cy="editar-card"]') // Busca o botão de excluir dentro dele
    .click();

    cy.get('[data-cy="edit-local"]').type("Teste Cypress Edição");
    cy.get('[data-cy="edit-meta"]').type("129999");  
    cy.get('[data-cy="salvar-edit"]').click(); 
  });

  it.only('Exclui a meta criada', () => {
    cy.visit('http://localhost:5173');

    cy.contains('[data-cy="card"]', 'Teste Cypress Edição') // Encontra o card certo
    .find('[data-cy="excluir-card"]') // Busca o botão de excluir dentro dele
    .click();
    });  
})