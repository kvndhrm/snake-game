// features/support/world.ts
import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, BrowserContextOptions } from '@playwright/test';
import { MainPage } from '../pages/main.page';

export interface ICustomWorld extends World {
  context: BrowserContext;
  page: Page;
  mainPage: MainPage;
  init: (options?: BrowserContextOptions) => Promise<void>;
  close: () => Promise<void>;
}

export class CustomWorld extends World implements ICustomWorld {
  context!: BrowserContext;
  page!: Page;
  mainPage!: MainPage;
  private browser?: Browser;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init(options: BrowserContextOptions = {}): Promise<void> {
    if (!this.browser) {
      this.browser = await chromium.launch({
        headless: process.env.HEADLESS !== 'false',
        slowMo: parseInt(process.env.SLOWMO || '250', 10),
        devtools: process.env.DEVTOOLS === 'true',
        args: [
          '--disable-web-security',
          '--disable-features=IsolateOrigins,site-per-process',
          '--disable-site-isolation-trials'
        ]
      });
    }
    
    // Initialize context and page
    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 1024 },
      ...options
    });
    
    this.page = await this.context.newPage();
    
    // Initialize page objects
    this.mainPage = new MainPage(this.page);
  }

  async close(): Promise<void> {
    try {
      // Close all pages in the context
      const pages = this.context?.pages() || [];
      await Promise.all(pages.map(page => page.close()));
      
      // Close the context
      if (this.context) {
        await this.context.close();
      }
      
      // Don't close the browser here to allow for browser reuse
    } catch (error) {
      console.error('Error during cleanup:', error);
      throw error;
    }
  }
  
  async closeBrowser(): Promise<void> {
    try {
      if (this.browser) {
        await this.browser.close();
        this.browser = undefined;
      }
    } catch (error) {
      console.error('Error closing browser:', error);
      throw error;
    }
  }
}

setWorldConstructor(CustomWorld);

export default CustomWorld;
