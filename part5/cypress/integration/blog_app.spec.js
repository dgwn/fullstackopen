describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      username: "tester",
      name: "A. Tester",
      password: "testpass"
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
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

  it("login form can be opened", function () {
    cy.contains("Login").click();
    cy.get("#username");
  });

  it("login fails with wrong credentials", function () {
    cy.contains("Login").click();
    cy.get("#username").type("tester");
    cy.get("#password").type("testpas");
    cy.get("#login-button").click();
    cy.get("#login-button").should("exist");
  });

  it("login succeeds with correct credentials", function () {
    cy.contains("Login").click();
    cy.get("#username").type("tester");
    cy.get("#password").type("testpass");
    cy.get("#login-button").click();
    cy.contains("#login-button").should("not.exist");
    cy.contains("Post Blog");
  });
});
