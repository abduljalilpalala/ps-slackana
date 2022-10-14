describe('empty spec', () => {
  it('passes', () => {
    cy.SignIn()
    cy.get('.items-between > .flex-row > .flex').click()
    cy.get('.pages___StyledInput-sc-18f5sp5-1').type("Test New Prject4")
    cy.get('.placeholder-slate-400').type("Test Tag4").type("{enter}")
    cy.get('.pages___StyledTextarea-sc-18f5sp5-5').type("Test test mo noy orange")
    cy.get('.SubmitButton___StyledButton-sc-1qvxv76-0').click()
  })
})
