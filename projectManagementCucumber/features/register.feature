Feature: User registration
    Scenario: Register with valid information
        Given I am on the registration page
        When I register with valid account information username: "Daniel", email: "test@test.com" and password: "Tester135."    
        Then I should be redirected to the login page
    
    Scenario: Register with invalid information
        Given I am on the registration page
        When I register with invalid field: "", email: "test@test.com", password: "Tester135." and confirm password "Tester135."     
        Then Empty username error should appear
        When I register with invalid field: "Daniel", email: "", password: "Tester135." and confirm password "Tester135."     
        Then Email error should appear
        When I register with invalid field: "Daniel", email: "test.com", password: "Tester135." and confirm password "Tester135."     
        Then Email error should appear
        When I register with invalid field: "Daniel", email: "test@test.com", password: "" and confirm password "Tester135."    
        Then Empty password error should appear
        When I register with invalid field: "Daniel", email: "test@test.com", password: "Test12." and confirm password "Tester135."    
        Then Wrong password error should appear
        When I register with invalid field: "Daniel", email: "test@test.com", password: "tester135." and confirm password "Tester135."    
        Then Wrong password error should appear
        When I register with invalid field: "Daniel", email: "test@test.com", password: "TESTER135." and confirm password "Tester135."    
        Then Wrong password error should appear
        When I register with invalid field: "Daniel", email: "test@test.com", password: "TesterTest" and confirm password "Tester135."    
        Then Wrong password error should appear
        When I register with invalid field: "Daniel", email: "test@test.com", password: "Tester135." and confirm password ""     
        Then Empty confirm password error should appear
        When I register with invalid field: "Daniel", email: "test@test.com", password: "Tester135." and confirm password "tester135."     
        Then Passwords does not match error should appear

    Scenario: Check the redirection from register page
        Given I am on the registration page
        When Redirect button is pressed
        Then I should be redirected to login page



# npx cucumber-js (to run test)
# add /features/Ecommerce.features (to run a specific file)
# add --exit (to automatically exit after execution) 
# add --format html:cucumber-report.html (for html reports)
# add --parallel 2 (for running test in parallel - 2 can be changed to any number)
# add --retry 1 (to retry failed test - 1 can be changed with how many retries you want)