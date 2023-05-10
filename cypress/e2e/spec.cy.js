import { faker } from "@faker-js/faker";

const name = faker.internet.userName();
const email = faker.internet.email();
const password = faker.internet.password();
let token;

describe("Testing swagger API", () => {
  it("test sign up / registration and status", () => {
    cy.request({
      method: "POST",
      url: "https://practice.expandtesting.com/notes/api/users/register",
      headers: {
        accept: "application/json",
      },
      body: {
        name: name,
        email: email,
        password: password,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it("test sign in / login and status", () => {
    cy.request({
      method: "POST",
      url: "https://practice.expandtesting.com/notes/api/users/login",
      headers: {
        accept: "application/json",
      },
      body: {
        email: email,
        password: password,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      token = response.body.data.token;
      return token;

    });
  });
})
  describe("Create new note", () => {
    beforeEach(() => {
      cy.fixture("userData").as("userNotes");
    });

    it("test POST a note", () => {
      cy.get("@userNotes").then(userNotes => {
        userNotes.forEach(note => {
            cy.addNote(
            token,
            note.title,
            note.description,
            note.category)
          .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.title).to.equal(note.title);
            expect(response.body.data.description).to.equal(note.description);
            expect(response.body.data.category).to.equal(note.category);
          });
        });
      });
    })})
