# Snake Game Automation Test Suite

Automated testing framework for Snake Game using Playwright + Cucumber (BDD).

## 🚀 Features

- **Page Object Model (POM)** - Clean separation of test logic and page interactions
- **Base Page Pattern** - Reusable methods for common operations
- **BDD with Cucumber** - Human-readable test scenarios
- **TypeScript** - Type-safe test code
- **Centralized Constants** - Easy configuration management

## 📁 Project Structure

```
features/
├── locators/
│   └── main_locator.ts          # Element locators
├── pages/
│   ├── base.page.ts              # Base page with reusable methods
│   └── main.page.ts              # Snake game page object
├── step_definitions/
│   └── snakegame.steps.ts        # Cucumber step definitions
├── support/
│   ├── constants.ts              # Configuration constants
│   ├── hooks.ts                  # Before/After hooks
│   └── world.ts                  # Cucumber World setup
└── snakegame.feature             # BDD test scenarios
```

## 🎯 Key Improvements

### 1. **BasePage Pattern**
- Centralized common methods (click, wait, verify)
- Consistent error handling and logging
- Configurable timeouts
- Reduces code duplication

### 2. **Constants Management**
- URLs, timeouts, and mappings in one place
- Easy to update configuration
- Type-safe constants

### 3. **Optimized Page Object**
- Extends BasePage for reusability
- Clean, readable methods
- Better error messages
- Proper TypeScript typing

### 4. **Improved Step Definitions**
- Organized by functionality
- Explicit assertions with expect()
- Better error handling
- Clear comments

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run with visible browser
npm run test:ui

# Run with debug mode
npm run test:debug

# Run specific scenarios with @tag
npm run test:ongoing
```

## 📊 Test Reports

The framework automatically generates multiple report formats:

### Report Types

1. **Console Output** - Real-time progress in terminal
2. **JSON Report** - `reports/cucumber-report.json`
3. **HTML Report** - `reports/cucumber-report.html`
4. **JUnit XML** - `reports/cucumber-report.xml`
5. **Custom HTML Report** - `reports/test-report.html` (Enhanced)

### Generate Reports

```bash
# Run tests (reports auto-generated)
npm test

# Generate custom HTML report
npm run report
```

### View Reports

**Custom HTML Report:**
```bash
# After running tests, generate and open report
npm run report
open reports/test-report.html
```

**Standard HTML Report:**
```bash
open reports/cucumber-report.html
```

### Report Features

✅ **Summary Statistics**
- Total scenarios (passed/failed/skipped)
- Pass rate percentage
- Total execution time
- Step-level details

✅ **Visual Dashboard**
- Color-coded status indicators
- Progress bars
- Responsive design
- Error messages with stack traces

✅ **Detailed Breakdown**
- Scenario-by-scenario results
- Step execution status
- Duration for each test
- Failure reasons

## 📝 Writing Tests

### Example Scenario
```gherkin
Scenario: Verify user can start snake game
    Given I open snake game website
    When I click "startBtn" button
    Then User can start snake game successfully
```

### Available Steps

**Navigation:**
- `Given I open snake game website`

**Button Interactions:**
- `When I click "{buttonId}" button`
- `Then see "{buttonId}" button`

**Arrow Keys:**
- `When I press "{direction}" arrow key`
  - Directions: up, down, left, right

**Verification:**
- `Then User can access '{title}' successfully`
- `Then User can see instructions '{text}' successfully`
- `Then Score should be {number}`
- `Then Score should be greater than {number}`

**Score Tracking:**
- `When I get initial score`
- `Then Snake should eat food and score increases`

## 🔧 Configuration

### Update Base URL
Edit `features/support/constants.ts`:
```typescript
export const URLS = {
    BASE_URL: 'http://localhost:3456/',
};
```

### Adjust Timeouts
Edit `features/support/constants.ts`:
```typescript
export const TIMEOUTS = {
    SHORT: 5000,
    DEFAULT: 10000,
    LONG: 30000,
    SCORE_WAIT: 50000,
};
```

## 🎨 Best Practices

1. **Use Page Objects** - Never interact with elements directly in step definitions
2. **Explicit Waits** - Always wait for elements before interacting
3. **Assertions** - Use expect() for clear test failures
4. **Reusable Steps** - Create generic steps that work across scenarios
5. **Clear Naming** - Use descriptive names for methods and variables
6. **Error Handling** - Catch and log errors appropriately

## 📊 Test Reports

Test results are displayed in the console with:
- ✔ Passed steps (green)
- ✖ Failed steps (red)
- Execution time
- Scenario summary

## 🛠️ Maintenance

### Adding New Locators
Add to `features/locators/main_locator.ts`:
```typescript
export const SnakeGameLocators = {
    newElement: '#elementId',
};
```

### Adding New Page Methods
Extend `MainPage` in `features/pages/main.page.ts`:
```typescript
async newMethod(): Promise<void> {
    await this.clickElement(SnakeGameLocators.newElement);
}
```

### Adding New Steps
Add to `features/step_definitions/snakegame.steps.ts`:
```typescript
When('I do something', async function () {
    await this.mainPage.newMethod();
});
```

## 🐛 Troubleshooting

**Tests timing out?**
- Increase timeout in step definition: `{ timeout: 60000 }`
- Check if application is running on correct port

**Element not found?**
- Verify locator in `main_locator.ts`
- Check if element is visible before interaction
- Add explicit wait

**Browser not launching?**
- Check Playwright installation: `npx playwright install`
- Verify browser binary exists

## 📚 Dependencies

- `@cucumber/cucumber` - BDD framework
- `@playwright/test` - Browser automation
- `typescript` - Type safety
- `ts-node` - TypeScript execution

## 🤝 Contributing

1. Follow existing code structure
2. Use TypeScript types
3. Add comments for complex logic
4. Test changes before committing
5. Update README if needed

## 📄 License

MIT
