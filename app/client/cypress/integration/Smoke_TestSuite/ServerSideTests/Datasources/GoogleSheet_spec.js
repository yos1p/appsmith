const datasource = require("../../../../locators/DatasourcesEditor.json");
const queryEditor = require("../../../../locators/QueryEditor.json");
const datasourceEditor = require("../../../../locators/DatasourcesEditor.json");
const apiwidget = require("../../../../locators/apiWidgetslocator.json");
const ApiEditor = require("../../../../locators/ApiEditor");
const uuid = () => Cypress._.random(0, 1e6);

let datasourceName, apiName, orgDatasourceName;

describe("Google sheet UQI test cases", function() {
  before(() => {
    orgDatasourceName = Cypress.env("GsheetDatasource");
  });

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

  it("Clicking on Add API the user must be navigate to API page ", function() {
    cy.SelectDatasource(orgDatasourceName);
    // check Add API button on selected datasource
    cy.CreateAPIFromDatasource(orgDatasourceName);
    cy.wait("@createNewApi");

    // check API editor page is open and Edit, API name with edit Icon
    cy.get(apiwidget.apiTxt)
      .should("be.visible")
      .blur();

    cy.get(apiwidget.editApiNameIcon)
      .should("be.visible");

    // cy.DeleteAPI();
  });

  it("User must be able to choose from the list of command ", function() {
    cy.get("[data-cy='actionConfiguration.formData.command.data']")
      .find(".remixicon-icon")
      .click({ force: true });
    cy.get(apiwidget.apiActionListContainer)
      .should("be.visible");
    
    //"List of commands are dispalyed as follows 
    // 1) Fetch Details
    cy.get(apiwidget.apiActionListContainer)
      .find(apiwidget.fetchDetailsActionOption)
      .should("be.visible");
    // 2) Insert One
    cy.get(apiwidget.apiActionListContainer)
      .find(apiwidget.insertOneActionOption)
      .should("be.visible");
    // 3) Update One
    cy.get(apiwidget.apiActionListContainer)
      .find(apiwidget.updateOneActionOption)
      .should("be.visible");
    // 4) Delete One
    cy.get(apiwidget.apiActionListContainer)
      .find(apiwidget.deleteOneActionOption)
      .should("be.visible");
    // 5) Fetch Many
    cy.get(apiwidget.apiActionListContainer)
      .find(apiwidget.fetchManyActionOption)
      .should("be.visible");
    // 6) Insert Many
    cy.get(apiwidget.apiActionListContainer)
      .find(apiwidget.insertManyActionOption)
      .should("be.visible");
    // 7) Update Many
    cy.get(apiwidget.apiActionListContainer)
      .find(apiwidget.updateManyActionOption)
      .should("be.visible");
    // 8) Delete Many"
    // cy.get(apiwidget.apiActionListContainer)
    //   .find(apiwidget.deleteManyActionOption)
    //   .should("be.visible");
    
    cy.get(apiwidget.fetchDetailsActionOption)
      .click({ force: true });
    cy.get(apiwidget.apiActionListContainer)
      .should("be.hidden");
  });

  it("Verify if the user can add focus on the field and add data ", function() {
    
  });

  it("Ensure tooltip is displayed to user for all the field name ", function() {
    cy.get(`${ApiEditor.apiEditorFormWrapper} .react-tabs__tab-panel .t--tooltip-wrapper`).each(($el) => {
      cy.wrap($el)
        .trigger("mouseover");
      
      cy.get(".bp3-popover-content")
        .should("be.visible")
        .first()
        .trigger("mouseover");
    });
  });

  after(() => {
    cy.DeleteAPI();
  });
});
