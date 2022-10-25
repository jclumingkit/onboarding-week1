export {};

describe("Test User Sign In, Add Post, Sign Out", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/user/signin");
    cy.get("[type='email']").type("womehig874@evilant.com");
    cy.get("[type='password']").type("test123123");
    cy.get("#btn-signin").click();
  });

  it("should redirect to user/profile after signin", () => {
    cy.url().should("be.equal", "http://localhost:3000/user/profile");
  });

  it("should be able to add food", () => {
    cy.contains("Add Food").click();
    cy.get("input[name='foodName']").type("Cy Test Food");
    cy.get("input[name='foodImageURL']").type(
      "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg"
    );
    cy.get("textarea[name='foodDescription']").type("This is a Cypress Test.");
    cy.get("[type='submit']").click();
    cy.contains("Food saved!").should("be.visible");
  });

  it("should sign out", () => {
    cy.get("#btn-burger").click();
    cy.contains("User").click();
    cy.contains("Sign Out").click();
    cy.get("#btn-burger").click();
    cy.url().should("be.equal", "http://localhost:3000/user/signin");
  });
});
