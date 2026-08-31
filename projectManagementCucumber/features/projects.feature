Feature: Projects creation
    Scenario: Dashboard projects number
        Given I registered and logged in with valid account info: username "Daniel", email: "test@test.com" and password "Tester135."
        When I create three in progress projects
        Then Same number of progress projects should appear in dashboard 0
        When I create 5 pending projects 
        Then Same number of progress projects should appear in dashboard 1
        When I create one project done
        Then Same number of progress projects should appear in dashboard 2

        # 0 - in progress
        # 1 - pending
        # 2 - done

    Scenario: Projects status change
        Given I registered and logged in with valid account info: username "Daniel", email: "test@test.com" and password "Tester135."
        When I created multiple projects with different statuses
        When I changed the statuses of some projects
        Then Proper number of each status should be in each page

    Scenario: Delete projects
        Given I registered and logged in with valid account info: username "Daniel", email: "test@test.com" and password "Tester135."
        When I create three projects
        Then I check if projects were created
        When I delete the projects
        Then I check if there are no more projects

    Scenario Outline: Invalid create project inputs
        Given I registered and logged in with valid account info: username "Daniel", email: "test@test.com" and password "Tester135."
        When I create a project with invalid field, name: "<name>", description: "<description>", start date: "<start>" and end date: "<end>"
        Then I check the proper error to appear

    Examples:
      | name      | description       | start      | end        |
      |           | description test  | 2026-01-01 | 2027-01-01 |
      | name test |                   | 2026-01-01 | 2027-01-01 |
      | name test | description test  |            | 2027-01-01 |
      | name test | description test  | 2026-01-01 |            |



