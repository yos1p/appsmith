const path = require("path");
const Perf = require("../src/perf");
const { delay } = require("../src/utils/utils");
const { actions } = require("./actions");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const SEL = {
  select_button: ".select-button",
  options_list: ".menu-virtual-list",
  select_option_item: (index) => `.menu-item-text:nth-child(${index})`,
  table_widget: ".t--widget-tablewidget",
  table_row_item: (index) => `.t--widget-tablewidget .tr:nth-child(${index})`,
  form_widget: ".t--widget-jsonformwidget",
  task_form_key: "t--jsonformfield-task",
};

async function testTableWidget() {
  try {
    const perf = new Perf();
    await perf.launch();
    const page = perf.getPage();

    perf.importApplication(`${APP_ROOT}/tests/dsl/table-filtering.json`);
    await delay(5000, "for newly created page to settle down");

    await page.waitForSelector(SEL.select_button);
    await perf.startTrace(actions.SELECT_TABLE_ROW);
    await delay(500);
    await page.click(SEL.table_row_item(1));
    await page.click(".t--widget-tablewidget .tr:nth-child(3)");
    await delay(2000);
    // await page.waitForFunction(
    //   `document.querySelector(${SEL.task_form_key}).innerText == "Create a query fetch_users with the Mock DB`,
    // );
    await perf.stopTrace();

    await perf.generateReport();
    await perf.close();
  } catch (e) {
    console.log(e);
  }
}

async function runTests() {
  await testTableWidget();
  // await testTableWidget();
  // await testTableWidget();
  // await testTableWidget();
  // await testTableWidget();
}
runTests();
