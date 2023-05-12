import 'cypress-downloadfile/lib/downloadFileCommand';
import 'cypress-file-upload';

describe("File upload and download tests", () => {
    beforeEach(() => {
      cy.visit("https://filebin.net/");
    });
  
    it("Upload file", () => {
        const fileName = "forest(2).png";
        cy.fixture(fileName).then(fileContent => {
          cy.get("#fileField").attachFile({
            fileContent: fileContent,
            fileName: fileName
          });
          cy.contains(fileName).should("be.visible");
        });
    });
});
    