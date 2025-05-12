const ExcelJs = require('exceljs');
const { test, expect, chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

let output = { r1: -1, c1: -1 };
let searchText = "Mango";
let changeTexg = "444";

async function excelTest(change, filePath, searchText, changeTexg) {
    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found at path: ${filePath}`);
    }

    const workBook = new ExcelJs.Workbook();
    await workBook.xlsx.readFile(filePath);

    const workSheet = workBook.getWorksheet('Sheet1');
    if (!workSheet) {
        throw new Error("Worksheet 'Sheet1' not found in the Excel file.");
    }

    await readExcel(workSheet, searchText);

    if (output.r1 === -1 || output.c1 === -1) {
        throw new Error(`Text '${searchText}' not found in the Excel file.`);
    }

    const cell = workSheet.getCell(output.r1, output.c1 + change.colChange);
    if (typeof changeTexg !== 'number' && typeof changeTexg !== 'string') {
        throw new Error("Invalid value for cell. Only numbers and strings are allowed.");
    }
    console.log(`Writing value '${changeTexg}' to row ${output.r1}, column ${output.c1 + change.colChange}`);
    cell.value = changeTexg;

    // Save the modified file with a new name for testing
    const newFilePath = filePath.replace('.xlsx', '_modified.xlsx');
    await workBook.xlsx.writeFile(newFilePath);
    console.log(`Modified file saved to: ${newFilePath}`);
    return newFilePath; // Return the new file path for further use
}

async function readExcel(workSheet, searchText) {
    let found = false;
    workSheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                console.log(`Found '${searchText}' at row ${rowNumber}, column ${colNumber}`);
                output.r1 = rowNumber;
                output.c1 = colNumber;
                found = true;
            }
        });
    });
    if (!found) {
        throw new Error(`Text '${searchText}' not found in the Excel file.`);
    }
}

test('Upload download excel validation', async () => {
    // Define the custom download folder path
    const downloadPath = path.join(__dirname, '../DownloadFiles'); // Path to your DownloadFiles folder

    // Launch a new browser context with the custom download path
    const browser = await chromium.launch();
    const context = await browser.newContext({
        acceptDownloads: true, // Enable downloads
    });

    // Create a new page
    const page = await context.newPage();

    // Navigate to the page
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

    // Trigger the download
    const [download] = await Promise.all([
        page.waitForEvent('download'), // Wait for the download to start
        page.locator("//button[@id='downloadButton']").click(), // Click the download button
    ]);

    // Generate a 4-digit random number
    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    // Get the suggested file name and append the random number
    const originalFileName = await download.suggestedFilename();
    const fileNameWithRandomNumber = originalFileName.replace(/(\.[\w\d_-]+)$/i, `_${randomNumber}$1`); // Add random number before the file extension

    // Save the downloaded file with the new name
    const filePath = path.join(downloadPath, fileNameWithRandomNumber);
    await download.saveAs(filePath);

    console.log(`File downloaded to: ${filePath}`);

    // Replace the cell (row 0, and col 3) value to 444
    const modifiedFilePath = await excelTest({ rowChange: 0, colChange: 2 }, filePath, searchText, changeTexg);

    // Upload the modified file
    await page.locator("//input[@id='fileinput']").setInputFiles(modifiedFilePath);

    //Verfiy the upload changes
    const texLocator = page.getByText(searchText);
    const desiredRole = await page.getByRole('row').filter({has: texLocator});
    expect(desiredRole.locator("#cell-4-undefined")).toContainText(changeTexg);



    await page.waitForTimeout(4000);
    // Close the browser
    await browser.close();
});