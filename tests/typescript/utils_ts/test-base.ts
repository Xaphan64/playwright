import { test as baseTest } from "@playwright/test";

interface TestDataForOrder {
  username: string;
  password: string;
  productName: string;
}

type Fixture = {
  testDataForOrder: TestDataForOrder;
};

export const customtest = baseTest.extend<Fixture>({
  testDataForOrder: {
    username: "daniel@alex.com",
    password: "Tester135.",
    productName: "ZARA COAT 3",
  },
});
