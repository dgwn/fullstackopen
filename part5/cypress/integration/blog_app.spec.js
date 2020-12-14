describe("Blogg app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("Blogs");
  });

  it("login form displays", function () {
    cy.contains("Username");
    cy.contains("Password");
    cy.contains("Login");
  });
});
