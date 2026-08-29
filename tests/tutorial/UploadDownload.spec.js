import { test, expect } from "@playwright/test";
const ExcelJs = require("exceljs");

async function writeExcelTest(searchText, replaceText, change, filePath) {
  // create a new workbook
  const workbook = new ExcelJs.Workbook();

  // read the file
  await workbook.xlsx.readFile(filePath);
  // read sheet 1
  const worksheet = workbook.getWorksheet("Sheet1");

  const output = await readExcel(worksheet, searchText);

  // get the cell and replace it's content
  const cell = worksheet.getCell(output.row, output.column + change.colChange);
  cell.value = replaceText;

  // save
  await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };

  // get each row
  worksheet.eachRow((row, rowNumber) => {
    // log each cell value
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output.row = rowNumber;
        output.column = colNumber;
      }
      console.log("before: " + cell.value);
    });
  });

  return output;
}

test("Upload download excel validation", async ({ page }) => {
  const textSearch = "Mango";
  const updateValue = 350;
  // go to page
  await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

  const downloadPromise = page.waitForEvent("download");

  // download the file
  await page.getByRole("button", { name: "Download" }).click();

  // wait for download to complete
  const download = await downloadPromise;

  // set the file path
  const filePath = "./tests/utils/download.xlsx";

  // save to filepath
  await download.saveAs(filePath);

  // run the modify function
  writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, filePath);

  // click on upload btn
  await page.locator("#fileinput").click();

  // upload the desired file (works only if input type=file)
  await page.locator("#fileinput").setInputFiles(filePath);

  // search for the proper row
  const textLocator = page.getByText(textSearch);
  const desiredRow = await page.getByRole("row").filter({ has: textLocator });

  // check if value was modified
  await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue.toString());
});
