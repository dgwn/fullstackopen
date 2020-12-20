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

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "tester", password: "testpass" });
    });

    it("a blog can be created", function () {
      cy.contains("Post Blog").click();
      cy.get("#titleInput").type("A New Blog");
      cy.get("#authorInput").type("F. Kafka");
      cy.get("#urlInput").type("http://www.google.com");
      cy.contains("Submit").click();
      cy.contains("A New Blog");
    });
  });
});
