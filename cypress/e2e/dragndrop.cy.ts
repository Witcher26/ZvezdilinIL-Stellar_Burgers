describe('drag and drop tests', function () {
    it('should be available to drag and drop and take an order', () => {
        cy.visit('/');
        cy.get("[data-cy='Краторная булка N-200i']").trigger("dragstart");
        cy.get("[data-cy='constructor'").trigger("drop");
        cy.get("[data-cy='Краторная булка N-200i counter']").should("have.text", "1");
        cy.get(".constructor-ingredient-data-cy").contains("Краторная булка N-200i");

        cy.get("[data-cy='Биокотлета из марсианской Магнолии']").trigger("dragstart");
        cy.get("[data-cy='constructor-inside']").trigger("drop");
        cy.get("[data-cy='Биокотлета из марсианской Магнолии counter']").should("have.text", "1");
        cy.get("[data-cy='make-an-order-info'] .order-button").click();
        cy.get("[data-cy='order-load']").should("have.text", "Ваш заказ начали готовить");
    })
})