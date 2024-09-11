describe('template spec', () => {
  beforeEach(() => {
    // Assurez-vous d'avoir une page de test où les champs sont accessibles
    cy.visit('http://localhost:8100'); // Changez l'URL selon votre application
  });

  it('should show validation error when the form is invalid', () => {
    // Soumettre le formulaire sans remplir les champs.
    // cy.get('form').submit();

    // Vérifier que le bouton est bien désactivé si le formulaire est invalide
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('should fill two input fields and submit the form', () => {

    // Sélectionnez le premier input et tapez une valeur
    cy.get('ion-input[formcontrolname="login"] input') // Sélection par l'attribut `name`, ajustez-le selon vos inputs
      .type('toto.2@poe.aelion.fr')
      .should('have.value', 'toto.2@poe.aelion.fr'); // Vérifiez si la valeur est correctement entrée

    // Sélectionnez le deuxième input et tapez une valeur
    cy.get('ion-input[formcontrolname="password"] input')
      .type('1234')
      .should('have.value', '1234');

    // Soumettez le formulaire
    cy.get('form').submit();

    // Vérifiez si le formulaire a bien été soumis (par exemple, redirection ou message de succès)
    cy.url().should('include', '/tabs/tab1'); // Assurez-vous que l'URL redirige bien vers le tableau de bord ou une autre page après soumission
  });

  it('should fill two input fields and submit the form with wrong user', () => {

    // Sélectionnez le premier input et tapez une valeur
    cy.get('ion-input[formcontrolname="login"] input') // Sélection par l'attribut `name`, ajustez-le selon vos inputs
      .type('tot.2@poe.aelion.fr')
      .should('have.value', 'tot.2@poe.aelion.fr'); // Vérifiez si la valeur est correctement entrée

    // Sélectionnez le deuxième input et tapez une valeur
    cy.get('ion-input[formcontrolname="password"] input')
      .type('1234')
      .should('have.value', '1234');

    // Soumettez le formulaire
    cy.get('form').submit();
    cy.wait(200)
    cy.get('ion-toast').should('exist');
    // Vérifiez si le formulaire a bien été soumis (par exemple, redirection ou message de succès)
    // cy.url().should('include', '/login'); // Assurez-vous que l'URL redirige bien vers le tableau de bord ou une autre page après soumission
    cy.get('ion-toast')
    .shadow()
    .find('.toast-message')
    .should('contain', 'Internal server error'); 
  });

  
})