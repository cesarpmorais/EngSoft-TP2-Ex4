describe('template spec', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('http://127.0.0.1:7001/')
  })

  it('Insere uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li')
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li .destroy')
      .invoke('show')
      .click();

    cy.get('.todo-list li')
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('.todo-list li .toggle')
      .first()
      .click();

    cy.contains('Active').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.contains('Completed').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.contains('All').click();
    cy.get('.todo-list li')
      .should('have.length', 2);
  });

  // Meus testes
  it('Verifica edição de to-do', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('Teste1{enter}');

    // Ensure the to-do item is added
    cy.get('.todo-list li')
    .should('have.length', 1)
      .first()
      .should('have.text', 'Teste1');

    // Double-click the to-do item to edit it
    cy.get('.todo-list li')
      .first()
      .dblclick();

    // Edit the to-do item and press Enter
    cy.get('.todo-list li .edit')
      .clear()
      .type('Teste2{enter}');

    cy.get('.todo-list li')
      .should('have.length', 1) 
      .first()
      .should('have.text', 'Teste2'); 
  })

  it('Verifica clear completed', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('Teste 1{enter}')
      .type('Teste 2{enter}');

    cy.get('.todo-list li .toggle')
      .check();

    cy.contains('Clear completed').click();
    cy.get('.todo-list li')
      .should('have.length', 0);
  })

  it('Verifica dados somem após recarregar a página', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('Persistência de dados{enter}');

    cy.reload();

    cy.get('.todo-list li')
      .should('have.length', 0);
  })
});

