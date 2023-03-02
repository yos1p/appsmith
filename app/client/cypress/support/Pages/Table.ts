import { ObjectsRegistry } from "../Objects/Registry";
const path = require("path");

type filterTypes =
  | "contains"
  | "does not contain"
  | "starts with"
  | "ends with"
  | "is exactly"
  | "empty"
  | "not empty"
  | "is equal to"
  | "not equal to"
  | "greater than"
  | "greater than or equal to"
  | "less than"
  | "less than or equal to";
type columnTypeValues =
  | "Plain Text"
  | "URL"
  | "Number"
  | "Image"
  | "Video"
  | "Date"
  | "Button"
  | "Menu Button"
  | "Icon Button";

export class Table {
  public agHelper = ObjectsRegistry.AggregateHelper;
  public deployMode = ObjectsRegistry.DeployMode;
  public locator = ObjectsRegistry.CommonLocators;
  public propPane = ObjectsRegistry.PropertyPane;

  private _tableWrap = "//div[@class='tableWrap']";
  private _tableHeader =
    this._tableWrap + "//div[@class='thead']//div[@class='tr'][1]";
  private _columnHeader = (columnName: string) =>
    this._tableWrap +
    "//div[@class='thead']//div[@class='tr'][1]//div[@role='columnheader']//span[text()='" +
    columnName +
    "']/parent::div/parent::div/parent::div";
  private _columnHeaderV2 = (columnName: string) =>
    this._tableWrap +
    "//div[@class='thead']//div[@class='tr'][1]//div[@role='columnheader']//div[text()='" +
    columnName +
    "']/parent::div/parent::div";
  private _nextPage = ".t--widget-tablewidget .t--table-widget-next-page";
  private _nextPageV2 = ".t--widget-tablewidgetv2 .t--table-widget-next-page";
  private _previousPage = ".t--widget-tablewidget .t--table-widget-prev-page";
  private _previousPageV2 =
    ".t--widget-tablewidgetv2 .t--table-widget-prev-page";
  private _pageNumber = ".t--widget-tablewidgetv2 .page-item";
  private _pageNumberServerSideOff =
    ".t--widget-tablewidgetv2 .t--table-widget-page-input input";
  private _pageNumberServerSidePagination = ".t--widget-tablewidget .page-item";
  private _pageNumberClientSidePagination =
    ".t--widget-tablewidget .t--table-widget-page-input input";
  _tableRow = (rowNum: number, colNum: number) =>
    `.t--widget-tablewidget .tbody .td[data-rowindex=${rowNum}][data-colindex=${colNum}]`;
  _tableRowV2 = (rowNum: number, colNum: number) =>
    `.t--widget-tablewidgetv2 .tbody .td[data-rowindex=${rowNum}][data-colindex=${colNum}]`;
  _tableRowColumnData = (rowNum: number, colNum: number) =>
    this._tableRow(rowNum, colNum) + ` div div`;
  _tableRowColumnDataV2 = (rowNum: number, colNum: number) =>
    this._tableRowV2(rowNum, colNum) + ` .cell-wrapper`;
  _tableLoadStateDelete =
    this._tableRow(0, 0) + ` div div button span:contains('Delete')`;
  _tableRowImageColumnData = (rowNum: number, colNum: number) =>
    this._tableRow(rowNum, colNum) + ` div div.image-cell`;
  _tableEmptyColumnData = `.t--widget-tablewidget .tbody .td`; //selected-row
  _tableEmptyColumnDataV2 = `.t--widget-tablewidgetv2 .tbody .td`; //selected-row
  _tableSelectedRow =
    this._tableWrap +
    "//div[contains(@class, 'tbody')]//div[contains(@class, 'selected-row')]/div";
  _liNextPage = "li[title='Next Page']";
  _liPreviousPage = "li[title='Previous Page']";
  _liCurrentSelectedPage =
    "//div[@type='LIST_WIDGET']//ul[contains(@class, 'rc-pagination')]/li[contains(@class, 'rc-pagination-item-active')]/a";
  private _searchText = "input[type='search']";
  _searchBoxCross =
    "//div[contains(@class, 't--search-input')]/following-sibling::div";
  _addIcon = "button span[icon='add']";
  _trashIcon = "button span[icon='trash']";
  _visibleTextSpan = (spanText: string) => "//span[text()='" + spanText + "']";
  _filterBtn = ".t--table-filter-toggle-btn";
  _filterColumnsDropdown = ".t--table-filter-columns-dropdown";
  _dropdownText = ".t--dropdown-option";
  _filterConditionDropdown = ".t--table-filter-conditions-dropdown";
  _filterInputValue = ".t--table-filter-value-input";
  _addColumn = ".t--add-column-btn";
  _deleteColumn = ".t--delete-column-btn";
  _defaultColNameV2 =
    "[data-rbd-draggable-id='customColumn1'] input[type='text']";
  private _filterApplyBtn = ".t--apply-filter-btn";
  private _filterCloseBtn = ".t--close-filter-btn";
  private _removeFilter = ".t--table-filter-remove-btn";
  private _clearAllFilter = ".t--clear-all-filter-btn";
  private _addFilter = ".t--add-filter-btn";
  _filterOperatorDropdown = ".t--table-filter-operators-dropdown";
  private _downloadBtn = ".t--table-download-btn";
  private _downloadOption = ".t--table-download-data-option";
  private _tableWidgetV2 = ".t--widget-tablewidgetv2";
  private _propertyPaneBackBtn = ".t--property-pane-back-btn";
  _columnSettings = (columnName: string) =>
    "//input[@placeholder='Column Title'][@value='" +
    columnName +
    "']/parent::div/parent::div/following-sibling::div/div[contains(@class, 't--edit-column-btn')]";
  _columnSettingsV2 = (columnName: string) =>
    `.t--property-pane-view .tablewidgetv2-primarycolumn-list div[data-rbd-draggable-id=${columnName}] .t--edit-column-btn`;
  _showPageItemsCount = "div.show-page-items";
  _filtersCount = this._filterBtn + " span.action-title";

  public WaitUntilTableLoad(
    rowIndex = 0,
    colIndex = 0,
    tableVersion: "v1" | "v2" = "v1",
  ) {
    if (tableVersion == "v1") {
      this.agHelper
        .GetElement(this._tableRowColumnData(rowIndex, colIndex), 30000)
        .waitUntil(($ele) =>
          cy
            .wrap($ele)
            .children("button")
            .should("have.length", 0),
        ); //or below will work:
      //this.agHelper.AssertElementAbsence(this._tableLoadStateDelete, 30000);
      // this.agHelper.Sleep(500);
    } else if (tableVersion == "v2") {
      cy.waitUntil(
        () => this.ReadTableRowColumnData(0, 0, tableVersion, 2000),
        {
          errorMsg: "Table is not populated",
          timeout: 10000,
          interval: 2000,
        },
      ).then((cellData) => {
        expect(cellData).not.empty;
        this.agHelper.Sleep(500);
      });
    }
  }

  public AssertTableLoaded(
    rowIndex = 0,
    colIndex = 0,
    tableVersion: "v1" | "v2" = "v1",
  ) {
    if (tableVersion == "v1") {
      this.agHelper
        .GetElement(this._tableRowColumnData(rowIndex, colIndex), 30000)
        .waitUntil(($ele) =>
          cy
            .wrap($ele)
            .children("span")
            .should("not.be.empty"),
        );
    } else if (tableVersion == "v2") {
      this.agHelper
        .GetElement(this._tableRowColumnDataV2(rowIndex, colIndex), 30000)
        .waitUntil(($ele) =>
          cy
            .wrap($ele)
            .children("span")
            .should("not.be.empty"),
        );
    }
  }

  public WaitForTableEmpty(tableVersion: "v1" | "v2" = "v1") {
    if (tableVersion == "v1") {
      cy.waitUntil(() => cy.get(this._tableEmptyColumnData), {
        errorMsg: "Table is populated when not expected",
        timeout: 10000,
        interval: 2000,
      }).then(($children) => {
        cy.wrap($children)
          .children()
          .should("have.length", 0); //or below
        //expect($children).to.have.lengthOf(0)
        this.agHelper.Sleep(500);
      });
    } else if (tableVersion == "v2") {
      cy.waitUntil(() => cy.get(this._tableEmptyColumnDataV2), {
        errorMsg: "Table is populated when not expected",
        timeout: 10000,
        interval: 2000,
      }).then(($children) => {
        cy.wrap($children)
          .children()
          .should("have.length", 0); //or below
        //expect($children).to.have.lengthOf(0)
        this.agHelper.Sleep(500);
      });
    }
  }

  public AssertTableHeaderOrder(expectedOrder: string) {
    cy.xpath(this._tableHeader)
      .invoke("text")
      .then((x) => {
        expect(x).to.eq(expectedOrder);
      });
  }

  public ReadTableRowColumnData(
    rowNum: number,
    colNum: number,
    tableVersion: "v1" | "v2" = "v1",
    timeout = 1000,
  ) {
    if (tableVersion == "v1") {
      //timeout can be sent higher values incase of larger tables
      this.agHelper.Sleep(timeout); //Settling time for table!
      return this.agHelper
        .GetElement(this._tableRowColumnData(rowNum, colNum), 30000)
        .invoke("text");
    } else if (tableVersion == "v2") {
      //timeout can be sent higher values incase of larger tables
      this.agHelper.Sleep(timeout); //Settling time for table!
      return cy.get(this._tableRowColumnDataV2(rowNum, colNum)).invoke("text");
    }
  }

  public AssertTableRowImageColumnIsLoaded(
    rowNum: number,
    colNum: number,
    timeout = 200,
  ) {
    //timeout can be sent higher values incase of larger tables
    this.agHelper.Sleep(timeout); //Settling time for table!
    return cy
      .get(this._tableRowImageColumnData(rowNum, colNum))
      .invoke("attr", "style")
      .should("not.be.empty");
  }

  public AssertHiddenColumns(
    columnNames: string[],
    tableVersion: "v1" | "v2" = "v1",
  ) {
    if (tableVersion == "v1") {
      columnNames.forEach(($header) => {
        cy.xpath(this._columnHeader($header))
          .invoke("attr", "class")
          .then((classes) => {
            expect(classes).includes("hidden-header");
          });
      });
    } else if (tableVersion == "v2") {
      columnNames.forEach(($header) => {
        cy.xpath(this._columnHeaderV2($header))
          .invoke("attr", "class")
          .then((classes) => {
            expect(classes).includes("hidden-header");
          });
      });
    }
  }

  public NavigateToNextPage(
    tableVersion: "v1" | "v2" = "v1",
    isServerPagination = true,
  ) {
    let curPageNo: number;
    if (tableVersion == "v1") {
      this.agHelper
        .GetText(
          isServerPagination
            ? this._pageNumberServerSidePagination
            : this._pageNumberClientSidePagination,
          isServerPagination ? "text" : "val",
        )
        .then(($currentPageNo) => (curPageNo = Number($currentPageNo)));
      cy.get(this._nextPage).click();
      this.agHelper
        .GetText(
          isServerPagination
            ? this._pageNumberServerSidePagination
            : this._pageNumberClientSidePagination,
          isServerPagination ? "text" : "val",
        )
        .then(($newPageNo) => expect(Number($newPageNo)).to.eq(curPageNo + 1));
    } else if (tableVersion == "v2") {
      cy.get(this._pageNumber)
        .invoke("text")
        .then(($currentPageNo) => (curPageNo = Number($currentPageNo)));
      cy.get(this._nextPageV2).click();
      cy.get(this._pageNumber)
        .invoke("text")
        .then(($newPageNo) => expect(Number($newPageNo)).to.eq(curPageNo + 1));
    }
  }

  public NavigateToPreviousPage(
    tableVersion: "v1" | "v2" = "v1",
    isServerPagination = true,
  ) {
    let curPageNo: number;
    if (tableVersion == "v1") {
      this.agHelper
        .GetText(
          isServerPagination
            ? this._pageNumberServerSidePagination
            : this._pageNumberClientSidePagination,
          isServerPagination ? "text" : "val",
        )
        .then(($currentPageNo) => (curPageNo = Number($currentPageNo)));
      cy.get(this._previousPage).click();
      this.agHelper
        .GetText(
          isServerPagination
            ? this._pageNumberServerSidePagination
            : this._pageNumberClientSidePagination,
          isServerPagination ? "text" : "val",
        )
        .then(($newPageNo) => expect(Number($newPageNo)).to.eq(curPageNo - 1));
    } else if (tableVersion == "v2") {
      cy.get(this._pageNumber)
        .invoke("text")
        .then(($currentPageNo) => (curPageNo = Number($currentPageNo)));
      cy.get(this._previousPageV2).click();
      cy.get(this._pageNumber)
        .invoke("text")
        .then(($newPageNo) => expect(Number($newPageNo)).to.eq(curPageNo - 1));
    }
  }

  public AssertPageNumber(
    pageNo: number,
    serverSide: "Off" | "On" = "On",
    tableVersion: "v1" | "v2" = "v1",
  ) {
    if (tableVersion == "v1") {
      if (serverSide == "On")
        cy.get(this._pageNumberServerSidePagination).should(
          "have.text",
          Number(pageNo),
        );
      else {
        cy.get(this._pageNumberClientSidePagination).should(
          "have.value",
          Number(pageNo),
        );
        cy.get(this._previousPage).should("have.attr", "disabled");
        cy.get(this._nextPage).should("have.attr", "disabled");
      }
      if (pageNo == 1)
        cy.get(this._previousPage).should("have.attr", "disabled");
    } else if (tableVersion == "v2") {
      if (serverSide == "On")
        cy.get(this._pageNumberServerSidePagination).should(
          "have.text",
          Number(pageNo),
        );
      else {
        cy.get(this._pageNumberClientSidePagination).should(
          "have.value",
          Number(pageNo),
        );
        cy.get(this._previousPageV2).should("have.attr", "disabled");
        cy.get(this._nextPageV2).should("have.attr", "disabled");
      }
      if (pageNo == 1)
        cy.get(this._previousPageV2).should("have.attr", "disabled");
    }
  }

  public AssertSelectedRow(rowNum: number = 0) {
    cy.xpath(this._tableSelectedRow)
      .invoke("attr", "data-rowindex")
      .then(($rowIndex) => {
        expect(Number($rowIndex)).to.eq(rowNum);
      });
  }

  public SelectTableRow(
    rowIndex: number,
    columnIndex = 0,
    select = true,
    tableVersion: "v1" | "v2" = "v1",
  ) {
    if (tableVersion == "v1") {
      //rowIndex - 0 for 1st row
      this.agHelper
        .GetElement(this._tableRow(rowIndex, columnIndex))
        .parent("div")
        .invoke("attr", "class")
        .then(($classes: any) => {
          if (
            (select && !$classes?.includes("selected-row")) ||
            (!select && $classes?.includes("selected-row"))
          )
            this.agHelper.GetNClick(
              this._tableRow(rowIndex, columnIndex),
              0,
              true,
            );
        });

      this.agHelper.Sleep(); //for select to reflect
    } else if (tableVersion == "v2") {
      //rowIndex - 0 for 1st row
      this.agHelper
        .GetElement(this._tableRowV2(rowIndex, columnIndex))
        .parent("div")
        .invoke("attr", "class")
        .then(($classes: any) => {
          if (
            (select && !$classes?.includes("selected-row")) ||
            (!select && $classes?.includes("selected-row"))
          )
            this.agHelper.GetNClick(
              this._tableRowV2(rowIndex, columnIndex),
              0,
              true,
            );
        });

      this.agHelper.Sleep(); //for select to reflect
    }
  }

  public AssertSearchText(searchTxt: string) {
    cy.get(this._searchText).should("have.value", searchTxt);
  }

  public SearchTable(searchTxt: string, index = 0) {
    cy.get(this._searchText)
      .eq(index)
      .type(searchTxt);
  }

  public RemoveSearchTextNVerify(
    cellDataAfterSearchRemoved: string,
    tableVersion: "v1" | "v2" = "v1",
  ) {
    this.agHelper.GetNClick(this._searchBoxCross);
    if (tableVersion == "v1") {
      this.ReadTableRowColumnData(0, 0, tableVersion).then(
        (aftSearchRemoved: any) => {
          expect(aftSearchRemoved).to.eq(cellDataAfterSearchRemoved);
        },
      );
    } else if (tableVersion == "v2") {
      this.ReadTableRowColumnData(0, 0, tableVersion).then(
        (aftSearchRemoved: any) => {
          expect(aftSearchRemoved).to.eq(cellDataAfterSearchRemoved);
        },
      );
    }
  }

  public OpenFilter() {
    this.agHelper.GetNClick(this._filterBtn);
  }

  public OpenNFilterTable(
    colName: string,
    colCondition: filterTypes,
    inputText = "",
    operator: "AND" | "OR" | "" = "",
    index = 0,
  ) {
    if (operator) {
      this.agHelper.GetNClick(this._addFilter);
      this.agHelper.GetNClick(this._filterOperatorDropdown);
      this.agHelper.GetNClickByContains(this.locator._dropdownText, operator);
    } else this.OpenFilter();

    this.agHelper.GetNClick(this._filterColumnsDropdown, index);
    this.agHelper.GetNClickByContains(this.locator._dropdownText, colName);
    this.agHelper.GetNClick(this._filterConditionDropdown, index);
    this.agHelper.GetNClickByContains(this.locator._dropdownText, colCondition);

    if (inputText)
      this.agHelper
        .GetNClick(this._filterInputValue, index)
        .type(inputText)
        .wait(500);

    this.agHelper.GetNClick(this._filterApplyBtn);
    //this.agHelper.ClickButton("APPLY")
  }

  public RemoveFilterNVerify(
    cellDataAfterFilterRemoved: string,
    toClose = true,
    removeOne = true,
    index = 0,
    tableVersion: "v1" | "v2" = "v1",
  ) {
    if (removeOne) this.agHelper.GetNClick(this._removeFilter, index);
    else this.agHelper.GetNClick(this._clearAllFilter);
    if (toClose) this.CloseFilter();
    if (tableVersion == "v1") {
      this.ReadTableRowColumnData(0, 0, tableVersion).then(
        (aftFilterRemoved: any) => {
          expect(aftFilterRemoved).to.eq(cellDataAfterFilterRemoved);
        },
      );
    } else if (tableVersion == "v2") {
      this.ReadTableRowColumnData(0, 0, tableVersion).then(
        (aftFilterRemoved: any) => {
          expect(aftFilterRemoved).to.eq(cellDataAfterFilterRemoved);
        },
      );
    }
  }

  public CloseFilter() {
    this.agHelper.GetNClick(this._filterCloseBtn);
  }

  public DownloadFromTable(filetype: "Download as CSV" | "Download as Excel") {
    cy.get(this._downloadBtn).click({ force: true });
    cy.get(this._downloadOption)
      .contains(filetype)
      .click({ force: true });
  }

  public ValidateDownloadNVerify(fileName: string, textToBePresent: string) {
    let downloadsFolder = Cypress.config("downloadsFolder");
    cy.log("downloadsFolder is:" + downloadsFolder);
    cy.readFile(path.join(downloadsFolder, fileName)).should("exist");
    this.VerifyDownloadedFile(fileName, textToBePresent);
  }

  public VerifyDownloadedFile(fileName: string, textToBePresent: string) {
    const downloadedFilename = Cypress.config("downloadsFolder")
      .concat("/")
      .concat(fileName);
    cy.readFile(downloadedFilename, "binary", {
      timeout: 15000,
    }).should((buffer) => expect(buffer).to.contain(textToBePresent));
  }

  public ChangeColumnType(
    columnName: string,
    newDataType: columnTypeValues,
    tableVersion: "v1" | "v2" = "v1",
  ) {
    if (tableVersion == "v1") {
      this.agHelper.GetNClick(this._columnSettings(columnName));
      this.agHelper.SelectDropdownList("Column Type", newDataType);
      this.agHelper.ValidateNetworkStatus("@updateLayout");
    } else if (tableVersion == "v2") {
      cy.get(this._tableWidgetV2)
        .click()
        .then(() => {
          cy.get(this._columnSettingsV2(columnName)).click();
          this.agHelper.SelectDropdownList("Column Type", newDataType);
          cy.get(this._propertyPaneBackBtn).click();
        });
    }
  }

  public AssertURLColumnNavigation(
    row: number,
    col: number,
    expectedURL: string,
    tableVersion: "v1" | "v2" = "v1",
  ) {
    if (tableVersion == "v1") {
      this.deployMode.StubbingWindow();
      this.agHelper
        .GetNClick(this._tableRowColumnData(row, col))
        .then(($cellData) => {
          //Cypress.$($cellData).trigger('click');
          cy.url().should("eql", expectedURL);
          this.agHelper.Sleep();
          cy.go(-1);
          this.WaitUntilTableLoad(0, 0, tableVersion);
        });
    } else if (tableVersion == "v2") {
      this.deployMode.StubbingWindow();
      this.agHelper
        .GetNClick(this._tableRowColumnDataV2(row, col))
        .then(($cellData) => {
          //Cypress.$($cellData).trigger('click');
          cy.url().should("eql", expectedURL);
          this.agHelper.Sleep();
          cy.go(-1);
          this.WaitUntilTableLoad(0, 0, tableVersion);
        });
    }
  }

  //List methods - keeping it for now!
  public NavigateToNextPage_List() {
    let curPageNo: number;
    cy.xpath(this._liCurrentSelectedPage)
      .invoke("text")
      .then(($currentPageNo) => (curPageNo = Number($currentPageNo)));
    cy.get(this._liNextPage).click();
    //cy.scrollTo('top', { easing: 'linear' })
    cy.xpath(this._liCurrentSelectedPage)
      .invoke("text")
      .then(($newPageNo) => expect(Number($newPageNo)).to.eq(curPageNo + 1));
  }

  public NavigateToPreviousPage_List() {
    let curPageNo: number;
    cy.xpath(this._liCurrentSelectedPage)
      .invoke("text")
      .then(($currentPageNo) => (curPageNo = Number($currentPageNo)));
    cy.get(this._liPreviousPage).click();
    //cy.scrollTo('top', { easing: 'linear' })
    cy.xpath(this._liCurrentSelectedPage)
      .invoke("text")
      .then(($newPageNo) => expect(Number($newPageNo)).to.eq(curPageNo - 1));
  }

  public AssertPageNumber_List(pageNo: number, checkNoNextPage = false) {
    cy.xpath(this._liCurrentSelectedPage)
      .invoke("text")
      .then(($currentPageNo) => expect(Number($currentPageNo)).to.eq(pageNo));

    if (pageNo == 1)
      cy.get(this._liPreviousPage).should("have.attr", "aria-disabled", "true");

    if (checkNoNextPage)
      cy.get(this._liNextPage).should("have.attr", "aria-disabled", "true");
    else cy.get(this._liNextPage).should("have.attr", "aria-disabled", "false");
  }

  public AddColumn(colId: string) {
    cy.get(this._addColumn).scrollIntoView();
    cy.get(this._addColumn)
      .should("be.visible")
      .click({ force: true });
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
    cy.get(this._defaultColNameV2).clear({
      force: true,
    });
    cy.get(this._defaultColNameV2).type(colId, { force: true });
  }

  public EditColumn(colId: string, shouldReturnToMainPane = true) {
    if (shouldReturnToMainPane) {
      this.propPane.NavigateBackToPropertyPane();
    }
    cy.get("[data-rbd-draggable-id='" + colId + "'] .t--edit-column-btn").click(
      {
        force: true,
      },
    );
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1500);
  }

  public DeleteColumn(colId: string) {
    this.propPane.NavigateBackToPropertyPane();
    cy.get(
      "[data-rbd-draggable-id='" + colId + "'] .t--delete-column-btn",
    ).click({
      force: true,
    });
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
  }
}
