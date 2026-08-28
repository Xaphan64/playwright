Feature: Ecommerce validations
    @Validation
    Scenario Outline: Placing the order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then Verify Error message is displayed

        Examples:
            | username        | password   |
            | daniel@alex.com | Tester135. |
            | hello@123.com   | IamHello@1 |

    @Validation
    Scenario: Placing the order
        Given a login to Ecommerce application with "daniel@alex.com" and "Tester135."
        When Add "ZARA COAT 3" to cart
        Then Verify "ZARA COAT 3" is displayed in the Cart
        When Enter valid details and place the order
        Then Verify order in present in the OrderHistory


# npx cucumber-js (to run test)
# add /features/Ecommerce.features (to run a specific file)
# add --exit (to automatically exit after execution) 
# add --format html:cucumber-report.html (for html reports)
# add --parallel 2 (for running test in parallel - 2 can be changed to any number)
# add --retry 1 (to retry failed test - 1 can be changed with how many retries you want)