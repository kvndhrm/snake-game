Feature: Snake Game Automated Test

Scenario: Verify user can access snake game successfully
    Given I open snake game website
    Then User can access 'Snake Game' successfully

Scenario: Verify user can see instructions successfully
    Given I open snake game website
    Then User can see instructions 'control the snake' successfully

Scenario: Verify user can start snake game successfully
    Given I open snake game website
    When I click "startBtn" button
    Then User can start snake game successfully

Scenario: Verify user can pause snake game successfully
    Given I open snake game website
    When I click "startBtn" button
    And I click "pauseBtn" button
    Then User can pause snake game successfully
    And see "Resume" button 

Scenario: Verify user can reset snake game successfully
    Given I open snake game website
    When I click "startBtn" button
    And I click "resetBtn" button
    Then User can reset snake game successfully

Scenario: Verify user can see Game Over modal shows successfully
    Given I open snake game website
    When I click "startBtn" button
    And I press "up" arrow key
    Then User can see Game Over modal shows successfully
    And see "playAgainBtn" button

@ongoing
Scenario: Verify snake move successfully
    Given I open snake game website
    When I click "startBtn" button
    And I press "up" arrow key
    And I press "left" arrow key
    And I press "down" arrow key
    And I press "right" arrow key
    