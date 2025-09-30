import { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class BasePage {
    protected readonly DEFAULT_TIMEOUT = 10000;
    protected readonly SHORT_TIMEOUT = 5000;
    protected readonly LONG_TIMEOUT = 30000;

    constructor(protected page: Page) {}

    /**
     * Navigate to a URL with retry logic
     */
    async navigateTo(url: string, options = { waitUntil: 'domcontentloaded' as const }): Promise<void> {
        try {
            await this.page.goto(url, options);
        } catch (error) {
            console.error(`Failed to navigate to ${url}:`, error);
            throw error;
        }
    }

    /**
     * Click an element with wait and error handling
     */
    async clickElement(selector: string, timeout: number = this.DEFAULT_TIMEOUT): Promise<void> {
        try {
            const element = this.page.locator(selector);
            await element.waitFor({ state: 'visible', timeout });
            await element.click();
        } catch (error) {
            console.error(`Failed to click element ${selector}:`, error);
            throw error;
        }
    }

    /**
     * Check if element is visible
     */
    async isElementVisible(selector: string, timeout: number = this.SHORT_TIMEOUT): Promise<boolean> {
        try {
            await this.page.locator(selector).waitFor({ state: 'visible', timeout });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Check if element contains text
     */
    async elementContainsText(selector: string, text: string): Promise<boolean> {
        try {
            await expect(this.page.locator(selector)).toContainText(text, { timeout: this.SHORT_TIMEOUT });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Check if button is enabled
     */
    async isButtonEnabled(selector: string): Promise<boolean> {
        try {
            await this.page.locator(selector).isEnabled();
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Check if button is disabled
     */
    async isButtonDisabled(selector: string): Promise<boolean> {
        try {
            await this.page.locator(selector).isDisabled();
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Get text content from element
     */
    async getTextContent(selector: string): Promise<string> {
        try {
            const text = await this.page.locator(selector).textContent();
            return text || '';
        } catch (error) {
            console.error(`Failed to get text from ${selector}:`, error);
            return '';
        }
    }

    /**
     * Press keyboard key
     */
    async pressKey(key: string): Promise<void> {
        await this.page.keyboard.press(key);
    }

    /**
     * Wait for a specific timeout
     */
    async wait(ms: number): Promise<void> {
        await this.page.waitForTimeout(ms);
    }
}
