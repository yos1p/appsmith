const datasource = require("../../../../locators/DatasourcesEditor.json");
const queryEditor = require("../../../../locators/QueryEditor.json");
const datasourceEditor = require("../../../../locators/DatasourcesEditor.json");
const apiwidget = require("../../../../locators/apiWidgetslocator.json");
const uuid = () => Cypress._.random(0, 1e6);

let datasourceName, apiName, orgDatasourceName = "My Gsheet";

describe("Google sheet UQI test cases", function() {
  // before(() => {
  //   orgDatasourceName = Cypress.env("GsheetDatasource");
  // });

  beforeEach(() => {
    cy.startRoutesForDatasource();
    apiName = "GsheetAPI" + uuid();
  });

  it("Ensure on Auth the user is navigate to Appsmith and GSheet datasource is created ", function() {
    cy.NavigateToQueryEditor();
    cy.NavigateToActiveTab();
    cy.get(`${datasourceEditor.datasourceCard}:contains('${orgDatasourceName}')`)
      .should("be.visible");
  });

  it("Ensure following(Add API, Edit, API name with edit Icon) is dispalyed to user", function() {
    // check Add API button on selected datasource
    cy.CreateAPIFromDatasource(orgDatasourceName);
    cy.wait("@createNewApi");

    // check API editor page is open and Edit, API name with edit Icon
    cy.get(apiwidget.apiTxt)
      .should("be.visible")
      .blur();

    cy.get(".t--action-name-edit-field")
      .should("contain.text", orgDatasourceName)
    
    cy.get(apiwidget.editApiNameIcon)
      .should("be.visible")
      .click({ force: true });

    cy.get(apiwidget.apiTxt)
      .should("be.visible")
      .blur();
  });
});
