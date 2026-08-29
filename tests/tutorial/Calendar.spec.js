import { test, expect } from "@playwright/test";

// java -jar jenkins.war -httpPort=9090

test("Calendar test", async ({ page }) => {
  // all months
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // date that you desire
  const monthNumber = "12";
  const date = "15";
  const year = "2029";
  const monthName = monthNames[Number(monthNumber) - 1];
  const expectedList = [monthNumber, date, year];
  //   const expectedList = [String(Number(monthNumber) + 1), date, year];

  // redirect to the page
  await page.goto("https://rahulshettyacademy.com/seleniumPractice/#/offers/");

  // select the calendar
  await page.locator(".react-date-picker__inputGroup").click();

  // select the year and press twice
  await page.locator(".react-calendar__navigation__label").click();
  await page.locator(".react-calendar__navigation__label").click();

  // select the year
  await page.getByText(year).click();

  // get the all the months and choose the desired one
  //   await page
  //     .locator(".react-calendar__year-view__months__month")
  //     .nth(Number(monthNumber) - 1)
  //     .click();
  await page.getByText(monthName, { exact: true }).click();

  // select the day
  await page.locator(`//abbr[text()='${date}']`).first().click();

  const inputs = page.locator(".react-date-picker__inputGroup__input");

  // verify that the proper value was inputted
  for (let i = 0; i < expectedList.length; i++) {
    const value = await inputs.nth(i).inputValue();
    console.log(`Input ${i}: "${value}"`);
    expect(value).toEqual(expectedList[i]);
  }
});
