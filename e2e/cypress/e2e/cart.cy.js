/// <reference types="cypress" />
describe('NYAA App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('displays list of products', () => {
    cy.contains('Products').click()
    cy.get('[data-testid="products-list"]').children().should('have.length', 6)
  })

  it('add one product to cart', () => {
    cy.contains('Green Notebook').click()

    cy.wait(1000)

    cy.get('[data-testid="price"]').invoke('text').should('eq', '$500.00')
    cy.contains('Add to Bag').click()
    cy.contains('Cart').click()
    cy.get('[data-testid="Subtotal"]').invoke('text').should('eq', '$500.00')
  })

  it('add two products to cart', () => {
    cy.contains('Green Notebook').click()

    cy.get('[data-testid="price"]').invoke('text').should('eq', '$500.00')
    cy.contains('Add to Bag').click()
    cy.wait(1000)
    cy.contains('Add to Bag').click()
    cy.contains('Cart').click()
    cy.get('[data-testid="Subtotal"]').invoke('text').should('eq', '$1000.00')
  })

  it('add two products to cart and remove one', () => {
    cy.contains('Green Notebook').click()
    cy.get('[data-testid="price"]').invoke('text').should('eq', '$500.00')
    cy.contains('Add to Bag').click()
    cy.wait(1000)

    cy.contains('Products').click()
    cy.contains('Brown Notebook').click()
    cy.get('[data-testid="price"]').invoke('text').should('eq', '$250.00')
    cy.contains('Add to Bag').click()
    cy.wait(1000)

    cy.contains('Cart').click()
    cy.get('[data-testid="Subtotal"]').invoke('text').should('eq', '$750.00')

    cy.contains('Green Notebook')
      .parent()
      .parent()
      .parent()
      .within(() => {
        cy.contains('Remove').click()
      })
    cy.wait(1000)
    cy.get('[data-testid="Subtotal"]').invoke('text').should('eq', '$250.00')
  })
})
