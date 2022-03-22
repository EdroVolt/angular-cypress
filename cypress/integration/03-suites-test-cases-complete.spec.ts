

describe('My First Test', () => {
    beforeEach(("visit url before every test case"),() =>{
        cy.visit("/")
    })
    it('test log command ', () => {
     cy.log("this is log test case")
    })

    it('test visit command to localhost ', () => {
        cy.visit("/")
    })

    it.skip('test visit command to any web site', () => {
        cy.visit("https://www.cypress.io")
    })

    it('test visit command to file', () => {
        cy.visit("")
    })

    it('test visit command to localhost, and display a view port ', () => {
        cy.viewport(550, 750)
        cy.visit("/")
    })

    it('test visit command to localhost and display view port2', () => {
        cy.viewport("samsung-s10")
        cy.visit("/")
    })

    //testing => getting element + making actions
    
    it('test visit command to localhost and get element ', () => {
        cy.visit("/")
        cy.get("h2")
    })

    
  })