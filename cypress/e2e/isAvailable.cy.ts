describe('service is available on localhost:3000', function () {
    it('should be available', () => {
        cy.visit('/')
        cy.visit('/feed')
    })
})