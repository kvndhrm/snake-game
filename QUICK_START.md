# 🚀 Quick Start Guide

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Snake game running on `http://localhost:3456/`

## ⚡ Quick Setup

```bash
# 1. Install dependencies
npm install

# 2. Run tests
npm test

# 3. Generate report
npm run report

# 4. Open report
open reports/test-report.html
```

## 🎯 Common Commands

### Running Tests

```bash
# Run all tests (headless)
npm test

# Run with browser visible
npm run test:ui

# Run with debug mode
npm run test:debug

# Run specific tests with @tag
npm run test:ongoing
```

### Generating Reports

```bash
# Tests auto-generate reports in reports/ folder
npm test

# Generate custom HTML report
npm run report

# View reports
open reports/test-report.html          # Custom report
open reports/cucumber-report.html      # Standard report
```

## 📁 Report Locations

After running tests, find reports in:
```
reports/
├── cucumber-report.json    # JSON format
├── cucumber-report.html    # Standard HTML
├── cucumber-report.xml     # JUnit XML
└── test-report.html        # Custom HTML (run npm run report)
```

## 🎨 Report Types

### 1. Console Output
Real-time progress in terminal:
```
✔ Given I open snake game website
✔ When I click "startBtn" button
✔ Then User can start snake game successfully

5 scenarios (5 passed)
15 steps (15 passed)
```

### 2. Custom HTML Report
Beautiful visual dashboard with:
- 📊 Summary statistics
- 📈 Pass rate graph
- 🎨 Color-coded results
- 🐛 Error details

### 3. Standard Reports
- **JSON**: For CI/CD integration
- **XML**: For Jenkins/TeamCity
- **HTML**: Standard Cucumber format

## 📝 Writing Your First Test

### 1. Create Feature File
```gherkin
# features/mytest.feature
Feature: My Test

Scenario: Test something
    Given I open snake game website
    When I click "startBtn" button
    Then User can start snake game successfully
```

### 2. Run It
```bash
npm test
```

### 3. View Results
```bash
npm run report
open reports/test-report.html
```

## 🔧 Configuration

### Change Base URL
Edit `features/support/constants.ts`:
```typescript
export const URLS = {
    BASE_URL: 'http://your-url:port/',
};
```

### Adjust Timeouts
Edit `features/support/constants.ts`:
```typescript
export const TIMEOUTS = {
    SHORT: 5000,
    DEFAULT: 10000,
    LONG: 30000,
};
```

### Update Cucumber Config
Edit `cucumber.js`:
```javascript
module.exports = {
    default: {
        timeout: 60000,  // Step timeout
        // ... other configs
    }
};
```

## 🐛 Troubleshooting

### Tests Not Running?
```bash
# Check if dependencies installed
npm install

# Verify snake game is running
curl http://localhost:3456/
```

### Reports Not Generated?
```bash
# Create reports directory
mkdir -p reports

# Run tests first
npm test

# Then generate report
npm run report
```

### Browser Not Launching?
```bash
# Install Playwright browsers
npx playwright install

# Or specific browser
npx playwright install chromium
```

## 📚 Learn More

- **Full Documentation**: See `README.md`
- **Optimization Details**: See `OPTIMIZATION_SUMMARY.md`
- **Available Steps**: See `features/step_definitions/snakegame.steps.ts`

## 🎯 Example Workflow

```bash
# 1. Start snake game server
# (in another terminal)
cd /path/to/snake-game
npm start

# 2. Run tests
npm test

# 3. Generate beautiful report
npm run report

# 4. View results
open reports/test-report.html

# 5. Debug failures (if any)
npm run test:debug
```

## 💡 Tips

1. **Use @tags** to organize tests
   ```gherkin
   @smoke
   Scenario: Critical test
   ```
   Run with: `npm test -- --tags @smoke`

2. **Run in UI mode** for debugging
   ```bash
   npm run test:ui
   ```

3. **Check reports** after every run
   ```bash
   npm run report && open reports/test-report.html
   ```

4. **Use constants** for maintainability
   - URLs in `constants.ts`
   - Locators in `main_locator.ts`
   - Timeouts in `constants.ts`

## 🚀 You're Ready!

Start writing tests and generating beautiful reports! 🎉

For detailed information, check:
- `README.md` - Complete documentation
- `OPTIMIZATION_SUMMARY.md` - What was improved
- Code comments - Inline help
