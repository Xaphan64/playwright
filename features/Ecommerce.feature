Feature: Ecommerce validations

    Scenario: Placing the order
        Given a login to Ecommerce application with "daniel@alex.com" and "Tester135."
        When Add "ZARA COAT 3" to cart
        Then Verify "ZARA COAT 3" is displayed in the Cart
        When Enter valid details and place the order
        Then Verify order in present in the OrderHistory
  