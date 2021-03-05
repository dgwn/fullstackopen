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

    it("once created, a blog can be liked", function () {
      cy.postBlog({
        title: "A New Blog",
        author: "F. Kafka",
        url: "http://www.google.com",
        token: JSON.parse(window.localStorage.loggedBlogAppUser).token
      });
      cy.contains("A New Blog").parent().contains("View").click();
      cy.contains("A New Blog").parent().contains("Like").click();
      cy.contains("has been updated to");
      cy.contains('"A New Blog" - F. Kafka').parent().contains("likes: 1");
    });

    it("the user who created a blog can delete it", function () {
      cy.postBlog({
        title: "A New Blog",
        author: "F. Kafka",
        url: "http://www.google.com",
        token: JSON.parse(window.localStorage.loggedBlogAppUser).token
      });
      cy.contains("A New Blog").parent().contains("View").click();
      cy.contains('"A New Blog" - F. Kafka')
        .parent()
        .contains("Delete")
        .click();
      cy.contains("has been deleted");
      cy.contains('"A New Blog" - F. Kafka').should("not.exist");
    });

    it("other users can not delete somebody else's blog", function () {
      const user2 = {
        username: "tester2",
        name: "B. Tester",
        password: "testpass"
      };
      cy.postBlog({
        title: "A New Blog",
        author: "F. Kafka",
        url: "http://www.google.com",
        token: JSON.parse(window.localStorage.loggedBlogAppUser).token
      });
      cy.contains("Logout").click();
      cy.request("POST", "http://localhost:3003/api/users/", user2);

      cy.login({ username: "tester2", password: "testpass" });
      cy.contains("A New Blog").parent().contains("View").click();
      cy.contains('"A New Blog" - F. Kafka')
        .parent()
        .contains("Delete")
        .should("not.exist");
    });

    it("blogs are ordered according to likes (most to least)", function () {
      cy.postBlog({
        title: "A New Blog",
        author: "F. Kafka",
        url: "http://www.google.com",
        token: JSON.parse(window.localStorage.loggedBlogAppUser).token
      });
      cy.postBlog({
        title: "Another New Blog",
        author: "F. Kafka",
        url: "http://www.google.com",
        token: JSON.parse(window.localStorage.loggedBlogAppUser).token
      });
      cy.postBlog({
        title: "Yet Another New Blog",
        author: "F. Kafka",
        url: "http://www.google.com",
        token: JSON.parse(window.localStorage.loggedBlogAppUser).token
      });

      // open menus
      cy.contains("A New Blog").parent().contains("View").click();
      cy.contains("Another New Blog").parent().contains("View").click();
      cy.contains("Yet Another New Blog").parent().contains("View").click();

      // like blogs
      for (let i = 0; i < 2; i++) {
        cy.contains('"A New Blog" - F. Kafka')
          .parent()
          .contains("Like")
          .click();
        cy.wait(500);
      }
      for (let i = 0; i < 6; i++) {
        cy.contains('"Another New Blog" - F. Kafka')
          .parent()
          .contains("Like")
          .click();
        cy.wait(500);
      }
      for (let i = 0; i < 4; i++) {
        cy.contains('"Yet Another New Blog" - F. Kafka')
          .parent()
          .contains("Like")
          .click();
        cy.wait(500);
      }

      // get all elements with likesNumber class
      cy.get(".likesNumber").then(($elements) => {
        // create an array of the number of likes for each blog as they appear in the DOM
        const DOMNums = $elements
          .map((index, html) => Cypress.$(html).text())
          .get();

        const sortedDOMNums = DOMNums.slice().sort(function (a, b) {
          return b - a;
        });
        // compare the array to a sorted (descending) copy of that array (sortedDOMNums)
        expect(DOMNums, "Items are sorted").to.deep.equal(sortedDOMNums);
      });
    });
  });
});
