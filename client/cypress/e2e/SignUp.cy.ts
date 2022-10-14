describe('empty spec', () => {
  it('passes', () => {
    cy.visit('https://slackana-client.vercel.app/sign-in')
    cy.get('a').click()
    cy.get('.AuthForm___StyledInput-sc-1udnn2y-2').type("Test Nielmar")
    cy.get('.AuthForm___StyledInput2-sc-1udnn2y-4').type("test@gmail.com")
    cy.get('.AuthForm___StyledInput3-sc-1udnn2y-6').type("password")
    cy.get('.AuthForm___StyledInput4-sc-1udnn2y-8').type("password")
    cy.get('.AuthForm___StyledButton-sc-1udnn2y-9').click()
  })
})
