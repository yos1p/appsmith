const datasource = require("../../../../locators/DatasourcesEditor.json");
const queryEditor = require("../../../../locators/QueryEditor.json");
const datasourceEditor = require("../../../../locators/DatasourcesEditor.json");
const apiwidget = require("../../../../locators/apiWidgetslocator.json");
const ApiEditor = require("../../../../locators/ApiEditor");
const uuid = () => Cypress._.random(0, 1e6);

let datasourceName, apiName, orgDatasourceName;
const fetchManyApiName = "FetchMany";

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
    cy.CreateAPIFromDatasource(orgDatasourceName, fetchManyApiName);

    // check API editor page is open and Edit, API name with edit Icon
    cy.get(ApiEditor.apiEditorFormWrapper).should("exist");
  });

  it("User must be able to choose from the list of command ", function() {
    // select a api entity
    cy.selectApiEntity(fetchManyApiName);
    // open operation dropdown
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.command.data']", -1);
    
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
      cy.wait(500);

      cy.get(".bp3-popover-content")
        .should("be.visible")
      
      cy.wrap($el)
        .trigger("mouseout");
      cy.wait(1000);
    });
  });

  it("Ensure on selecting the command respective page is displayed to user ", function() {
    // Fetch Details page validation
    cy.selectApiEntity(fetchManyApiName);
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.command.data']", 0);
    cy.wait(500);    
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.entityType.data']", 1);
    cy.wait(500);
    cy.get(ApiEditor.apiEditorFormWrapper).should("contain.text", "Spreadsheet");
    cy.get("[data-cy='actionConfiguration.formData.sheetUrl.data']")
      .should("be.visible");

    // Insert One page validation
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.command.data']", 1);
    cy.wait(500);    
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.entityType.data']", 0);
    cy.wait(500);
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.sheetUrl.data']", 0);
    cy.wait(500);
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.sheetName.data']", 0);
    cy.wait(500);
    cy.get(ApiEditor.apiEditorFormWrapper).should("contain.text", "Table Heading Row Index"); 
    cy.get(ApiEditor.apiEditorFormWrapper).should("contain.text", "Row Object");

    // Update One page validation
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.command.data']", 2);
    cy.wait(500);    
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.entityType.data']", 0);
    cy.wait(500);
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.sheetUrl.data']", 0);
    cy.wait(500);
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.sheetName.data']", 0);
    cy.wait(500);
    cy.get(ApiEditor.apiEditorFormWrapper).should("contain.text", "Table Heading Row Index"); 
    cy.get(ApiEditor.apiEditorFormWrapper).should("contain.text", "Update Row Object");

    // Delete One page validation
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.command.data']", 3);
    cy.wait(500);    
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.entityType.data']", 0);
    cy.wait(500);
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.sheetUrl.data']", 0);
    cy.wait(500);
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.sheetName.data']", 0);
    cy.wait(500);
    cy.get(ApiEditor.apiEditorFormWrapper).should("contain.text", "Table Heading Row Index"); 
    cy.get(ApiEditor.apiEditorFormWrapper).should("contain.text", "Row Index");

    // Fetch Many page validation
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.command.data']", 4);
    cy.wait(500);    
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.entityType.data']", 0);
    cy.wait(500);
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.sheetUrl.data']", 0);
    cy.wait(500);
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.sheetName.data']", 0);
    cy.get(ApiEditor.apiEditorFormWrapper).should("contain.text", "Table Heading Row Index"); 
    cy.get(ApiEditor.apiEditorFormWrapper).should("contain.text", "Columns");
    cy.get(ApiEditor.apiEditorFormWrapper).should("contain.text", "Filter Format");
    cy.get(ApiEditor.apiEditorFormWrapper).should("contain.text", "Filter By");
    cy.get(ApiEditor.apiEditorFormWrapper).should("contain.text", "Sort By");
    cy.get(ApiEditor.apiEditorFormWrapper).should("contain.text", "Pagination Limit");
    cy.get(ApiEditor.apiEditorFormWrapper).should("contain.text", "Pagination Offset");

    // Insert Many page validation
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.command.data']", 5);
    cy.wait(500);    
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.entityType.data']", 0);
    cy.wait(500);
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.sheetUrl.data']", 0);
    cy.get(ApiEditor.apiEditorFormWrapper).should("contain.text", "Sheet Name");
    cy.get("[data-cy='actionConfiguration.formData.sheetName.data']")
      .should("be.visible");
    cy.get(ApiEditor.apiEditorFormWrapper).should("contain.text", "Table Heading Row Index"); 
    cy.get(ApiEditor.apiEditorFormWrapper).should("contain.text", "Row Object(s)");

    // Update Many page validation
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.command.data']", 6);
    cy.wait(500);    
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.entityType.data']", 0);
    cy.wait(500);
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.sheetUrl.data']", 0);
    cy.wait(500);
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.sheetName.data']", 0);
    cy.wait(500);
    cy.get(ApiEditor.apiEditorFormWrapper).should("contain.text", "Table Heading Row Index"); 
    cy.get(ApiEditor.apiEditorFormWrapper).should("contain.text", "Update Row Object(s)");

  });

  it("Fetch Many: test cases ", function() {
    // User should be able to select data from the dropdown
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.command.data']", 4);
    cy.wait(500);
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.entityType.data']", 0);
    cy.wait(500);

    // User should be able to delete the selected filters 
    cy.get(ApiEditor.addMoreWhereClassIcon)
      .click({ force: true });
    cy.wait(100);
    cy.get(ApiEditor.removeWhereClassIcon)
      .should("have.length", 2);

    cy.get(ApiEditor.removeWhereClassIcon)
      .last()
      .click({ force: true });
    
    cy.get(ApiEditor.removeWhereClassIcon)
      .should("have.length", 1);
  });

  it("Spreadsheet: test cases", function() {
    // User should be able to select data from the dropdown 
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.sheetUrl.data']", 0);
    cy.wait(500);

    // User should be able to convert the field into JS 
    cy.toggleJsEditor(0);

    cy.get("[data-cy='actionConfiguration.formData.sheetUrl.data']")
      .should("be.visible");
  });

  it("Sheetname: test cases", function() {
    // User should be able to select data from the dropdown
    cy.selectDropdownOption("[data-cy='actionConfiguration.formData.sheetName.data']", 0);
    cy.wait(1000);

    // User should be able to convert the field into JS and not reverting
    cy.toggleJsEditor(1, false);

    //User should be able to add Sheet name into field on JS convertion 
    cy.get(`${ApiEditor.toggleJsButton}.is-active`)
      .parent()
      .parent()
      .find('[data-testid="code-editor-target"]')
      .click()
      .type("Hello, world", 1000);

    // cy.get("[data-cy='actionConfiguration.formData.sheetName.data']")
    //   .should("be.visible");
  });

  after(() => {
    // cy.DeleteAPI();
  });
});
