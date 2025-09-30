import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { SnakeGameLocators } from '../locators/main_locator';
import { URLS, DIRECTIONS, Direction, TIMEOUTS } from '../support/constants';

export class MainPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async navigate(): Promise<void> {
        await this.navigateTo(URLS.BASE_URL);
    }

    async isTitleVisible(title: string): Promise<boolean> {
        return await this.elementContainsText(SnakeGameLocators.title, title);
    }

    async isInstructionsVisible(title: string): Promise<boolean> {
        return await this.elementContainsText(SnakeGameLocators.instrunction, title);
    }

    async clickButton(buttonId: string): Promise<void> {
        await this.clickElement(`button[id="${buttonId}"]`);
    }

    async isVisibleButton(buttonId: string): Promise<boolean> {
        return await this.isElementVisible(`button[id="${buttonId}"]`);
    }

    async isStartButtonEnabled(): Promise<boolean> {
        return await this.isButtonEnabled(SnakeGameLocators.startButton);
    }

    async isStartButtonDisabled(): Promise<boolean> {
        return await this.isButtonDisabled(SnakeGameLocators.startButton);
    }
    
    async isPauseButtonDisabled(): Promise<boolean> {
        return await this.isButtonDisabled(SnakeGameLocators.pauseButton);
    }

    async buttonTextChanges(text: string): Promise<boolean> {
        return await this.elementContainsText(SnakeGameLocators.pauseButton, text);
    }

    async isButtonVisible(buttonId: string): Promise<boolean> {
        return await this.isElementVisible(`button[id="${buttonId}"]`);
    }

    async isGameOverModalVisible(): Promise<boolean> {
        return await this.isElementVisible(SnakeGameLocators.gameOvermodal);
    }

    async pressArrowKey(direction: Direction): Promise<void> {
        const key = DIRECTIONS[direction];
        if (!key) {
            throw new Error(`Invalid direction: ${direction}. Valid directions: ${Object.keys(DIRECTIONS).join(', ')}`);
        }
        await this.pressKey(key);
    }

    async pressArrowUp(): Promise<void> {
        await this.pressArrowKey('up');
    }

    async pressArrowDown(): Promise<void> {
        await this.pressArrowKey('down');
    }

    async pressArrowLeft(): Promise<void> {
        await this.pressArrowKey('left');
    }

    async pressArrowRight(): Promise<void> {
        await this.pressArrowKey('right');
    }

    
    async getScore(): Promise<number> {
        const scoreText = await this.getTextContent(SnakeGameLocators.score);
        return parseInt(scoreText || '0', 10);
    }

    async waitForScoreIncrease(initialScore: number, timeout: number = TIMEOUTS.SCORE_WAIT): Promise<boolean> {
        try {
            await this.page.waitForFunction(
                (score) => {
                    const currentScore = document.querySelector('#score')?.textContent;
                    return parseInt(currentScore || '0', 10) > score;
                },
                initialScore,
                { timeout }
            );
            return true;
        } catch (error) {
            console.error(`Score did not increase from ${initialScore} within ${timeout}ms`);
            return false;
        }
    }

    async verifyScoreIncreased(initialScore: number): Promise<boolean> {
        const currentScore = await this.getScore();
        return currentScore > initialScore;
    }
}
