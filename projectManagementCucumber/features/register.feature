Feature: User registration
    Scenario: Register with valid information
        Given I am on the registration page
        When I register with valid account information      
        Then I should be redirected to the login page


# npx cucumber-js (to run test)
# add /features/Ecommerce.features (to run a specific file)
# add --exit (to automatically exit after execution) 
# add --format html:cucumber-report.html (for html reports)
# add --parallel 2 (for running test in parallel - 2 can be changed to any number)
# add --retry 1 (to retry failed test - 1 can be changed with how many retries you want)