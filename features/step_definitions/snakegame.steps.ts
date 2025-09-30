import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { Direction } from "../support/constants";

// Navigation Steps
Given('I open snake game website', async function () {
    await this.mainPage.navigate();
});

// Verification Steps
Then('User can access {string} successfully', async function (title: string) {
    const isVisible = await this.mainPage.isTitleVisible(title);
    expect(isVisible).toBe(true);
});

Then('User can see instructions {string} successfully', async function (title: string) {
    const isVisible = await this.mainPage.isInstructionsVisible(title);
    expect(isVisible).toBe(true);
});

// Button Interaction Steps
When('I click {string} button', async function (buttonId: string) {
    await this.mainPage.clickButton(buttonId);
});

Then('User can start snake game successfully', async function () {
    const isDisabled = await this.mainPage.isStartButtonDisabled();
    expect(isDisabled).toBe(true);
});

Then('User can pause snake game successfully', async function () {
    const isDisabled = await this.mainPage.isStartButtonDisabled();
    expect(isDisabled).toBe(true);
});

Then('see {string} button', async function (buttonIdOrText: string) {
    // Check if it's a button ID (contains 'Btn') or text content
    if (buttonIdOrText.includes('Btn')) {
        // It's a button ID - check visibility
        const isVisible = await this.mainPage.isButtonVisible(buttonIdOrText);
        expect(isVisible).toBe(true);
    } else {
        // It's text content - check button text
        const hasText = await this.mainPage.buttonTextChanges(buttonIdOrText);
        expect(hasText).toBe(true);
    }
});

Then('User can reset snake game successfully', async function () {
    const isEnabled = await this.mainPage.isStartButtonEnabled();
    const isPauseDisabled = await this.mainPage.isPauseButtonDisabled();
    expect(isEnabled).toBe(true);
    expect(isPauseDisabled).toBe(true);
});

Then('User can see Game Over modal shows successfully', async function () {
    const isVisible = await this.mainPage.isGameOverModalVisible();
    expect(isVisible).toBe(true);
});

// Arrow Key Steps
When('I press {string} arrow key', async function (direction: string) {
    await this.mainPage.pressArrowKey(direction.toLowerCase() as Direction);
});


// Score Steps
When('I get initial score', async function () {
    this.initialScore = await this.mainPage.getScore();
});

Then('Snake should eat food and score increases', { timeout: 60000 }, async function () {
    const scoreIncreased = await this.mainPage.waitForScoreIncrease(this.initialScore || 0);
    expect(scoreIncreased).toBe(true);
});

Then('Score should be {int}', async function (expectedScore: number) {
    const currentScore = await this.mainPage.getScore();
    expect(currentScore).toBe(expectedScore);
});

Then('Score should be greater than {int}', async function (minScore: number) {
    const currentScore = await this.mainPage.getScore();
    expect(currentScore).toBeGreaterThan(minScore);
});