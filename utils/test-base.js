import { test as base } from "@playwright/test";

export const customtest = base.test.extend({
  testDataForOrder: {
    username: "daniel@alex.com",
    password: "Tester135.",
    productName: "ZARA COAT 3",
  },
});
