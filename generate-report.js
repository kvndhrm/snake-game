const fs = require('fs');
const path = require('path');

// Read the JSON report
const reportPath = path.join(__dirname, 'reports', 'cucumber-report.json');
const htmlPath = path.join(__dirname, 'reports', 'test-report.html');

if (!fs.existsSync(reportPath)) {
    console.error('❌ No report found. Run tests first: npm test');
    process.exit(1);
}

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

// Calculate statistics
let totalScenarios = 0;
let passedScenarios = 0;
let failedScenarios = 0;
let skippedScenarios = 0;
let totalSteps = 0;
let passedSteps = 0;
let failedSteps = 0;
let skippedSteps = 0;
let totalDuration = 0;

const scenarios = [];

report.forEach(feature => {
    feature.elements.forEach(scenario => {
        totalScenarios++;
        let scenarioPassed = true;
        let scenarioSkipped = false;
        let scenarioDuration = 0;

        scenario.steps.forEach(step => {
            totalSteps++;
            if (step.result.duration) {
                scenarioDuration += step.result.duration / 1000000; // Convert to ms
            }

            if (step.result.status === 'passed') {
                passedSteps++;
            } else if (step.result.status === 'failed') {
                failedSteps++;
                scenarioPassed = false;
            } else if (step.result.status === 'skipped') {
                skippedSteps++;
                scenarioSkipped = true;
            }
        });

        totalDuration += scenarioDuration;

        if (!scenarioPassed) {
            failedScenarios++;
        } else if (scenarioSkipped) {
            skippedScenarios++;
        } else {
            passedScenarios++;
        }

        scenarios.push({
            name: scenario.name,
            status: !scenarioPassed ? 'failed' : scenarioSkipped ? 'skipped' : 'passed',
            duration: scenarioDuration,
            steps: scenario.steps
        });
    });
});

const passRate = ((passedScenarios / totalScenarios) * 100).toFixed(2);

// Generate HTML
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Report - Snake Game</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f5f5; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 20px; }
        .header h1 { font-size: 32px; margin-bottom: 10px; }
        .header p { opacity: 0.9; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px; }
        .stat-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .stat-card h3 { color: #666; font-size: 14px; margin-bottom: 10px; text-transform: uppercase; }
        .stat-card .value { font-size: 32px; font-weight: bold; }
        .stat-card.passed .value { color: #10b981; }
        .stat-card.failed .value { color: #ef4444; }
        .stat-card.skipped .value { color: #f59e0b; }
        .stat-card.total .value { color: #667eea; }
        .scenarios { background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); padding: 20px; }
        .scenarios h2 { margin-bottom: 20px; color: #333; }
        .scenario { border-left: 4px solid #ddd; padding: 15px; margin-bottom: 15px; background: #f9f9f9; border-radius: 4px; }
        .scenario.passed { border-left-color: #10b981; }
        .scenario.failed { border-left-color: #ef4444; }
        .scenario.skipped { border-left-color: #f59e0b; }
        .scenario-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .scenario-name { font-weight: 600; font-size: 16px; }
        .scenario-status { padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; text-transform: uppercase; }
        .scenario-status.passed { background: #d1fae5; color: #065f46; }
        .scenario-status.failed { background: #fee2e2; color: #991b1b; }
        .scenario-status.skipped { background: #fef3c7; color: #92400e; }
        .scenario-duration { color: #666; font-size: 14px; }
        .steps { margin-top: 10px; }
        .step { padding: 8px; margin: 5px 0; border-radius: 4px; font-size: 14px; }
        .step.passed { background: #d1fae5; color: #065f46; }
        .step.failed { background: #fee2e2; color: #991b1b; }
        .step.skipped { background: #fef3c7; color: #92400e; }
        .step-keyword { font-weight: 600; margin-right: 5px; }
        .error-message { background: #fef2f2; border: 1px solid #fecaca; padding: 10px; margin-top: 10px; border-radius: 4px; color: #991b1b; font-family: monospace; font-size: 12px; white-space: pre-wrap; }
        .progress-bar { height: 30px; background: #e5e7eb; border-radius: 15px; overflow: hidden; margin: 20px 0; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, #10b981 0%, #059669 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; transition: width 0.3s; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎮 Snake Game Test Report</h1>
            <p>Generated on ${new Date().toLocaleString()}</p>
        </div>

        <div class="stats">
            <div class="stat-card total">
                <h3>Total Scenarios</h3>
                <div class="value">${totalScenarios}</div>
            </div>
            <div class="stat-card passed">
                <h3>Passed</h3>
                <div class="value">${passedScenarios}</div>
            </div>
            <div class="stat-card failed">
                <h3>Failed</h3>
                <div class="value">${failedScenarios}</div>
            </div>
            <div class="stat-card skipped">
                <h3>Skipped</h3>
                <div class="value">${skippedScenarios}</div>
            </div>
        </div>

        <div class="progress-bar">
            <div class="progress-fill" style="width: ${passRate}%">
                ${passRate}% Pass Rate
            </div>
        </div>

        <div class="stats">
            <div class="stat-card">
                <h3>Total Steps</h3>
                <div class="value" style="color: #667eea;">${totalSteps}</div>
            </div>
            <div class="stat-card">
                <h3>Passed Steps</h3>
                <div class="value" style="color: #10b981;">${passedSteps}</div>
            </div>
            <div class="stat-card">
                <h3>Failed Steps</h3>
                <div class="value" style="color: #ef4444;">${failedSteps}</div>
            </div>
            <div class="stat-card">
                <h3>Duration</h3>
                <div class="value" style="color: #667eea; font-size: 24px;">${(totalDuration / 1000).toFixed(2)}s</div>
            </div>
        </div>

        <div class="scenarios">
            <h2>📋 Test Scenarios</h2>
            ${scenarios.map(scenario => `
                <div class="scenario ${scenario.status}">
                    <div class="scenario-header">
                        <div class="scenario-name">${scenario.name}</div>
                        <div>
                            <span class="scenario-status ${scenario.status}">${scenario.status}</span>
                            <span class="scenario-duration">${(scenario.duration / 1000).toFixed(2)}s</span>
                        </div>
                    </div>
                    <div class="steps">
                        ${scenario.steps.map(step => `
                            <div class="step ${step.result.status}">
                                <span class="step-keyword">${step.keyword}</span>
                                <span>${step.name}</span>
                                ${step.result.error_message ? `<div class="error-message">${step.result.error_message}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="footer">
            <p>Generated by Cucumber Test Framework</p>
        </div>
    </div>
</body>
</html>
`;

// Write HTML report
fs.writeFileSync(htmlPath, html);

console.log('\n✅ Test Report Generated Successfully!\n');
console.log('📊 Summary:');
console.log(`   Total Scenarios: ${totalScenarios}`);
console.log(`   ✅ Passed: ${passedScenarios}`);
console.log(`   ❌ Failed: ${failedScenarios}`);
console.log(`   ⏭️  Skipped: ${skippedScenarios}`);
console.log(`   📈 Pass Rate: ${passRate}%`);
console.log(`   ⏱️  Duration: ${(totalDuration / 1000).toFixed(2)}s`);
console.log(`\n📁 Report Location: ${htmlPath}`);
console.log(`\n🌐 Open in browser: file://${htmlPath}\n`);
