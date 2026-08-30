Feature: User login
    Scenario: Login with valid information
        Given I registered with a valid account info: "Daniel", email: "test@test.com" and password: "Tester135."
        When I login with valid account: "test@test.com", "Tester135."
        Then I should be redirected to the dashboard page
    
    Scenario: Login with invalid information
        Given I registered with a valid account info: "Daniel", email: "test@test.com" and password: "Tester135."
        When I login with invalid field: "test.com" and "Tester135."
        Then I should get browser error on email field
        When I login with invalid field: "" and "Tester135."
        Then I should get browser error on email field
        When I login with invalid field: "test@t.com" and "Tester135."
        Then I should get wrong email or password error
        When I login with invalid field: "test@test.com" and ""
        Then I should get browser error on password field
        When I login with invalid field: "test@test.com" and "Tester"
        Then I should get wrong email or password error
        When I login with invalid field: "test@t.com" and "Tester"
        Then I should get wrong email or password error
