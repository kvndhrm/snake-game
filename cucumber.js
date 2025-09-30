module.exports = {
    default: {
      require: [
        './features/support/**/*.ts',
        './features/step_definitions/**/*.ts'
      ],
      requireModule: ['ts-node/register'],
      paths: ['./features/**/*.feature'],
      format: [
        'progress',
        'json:reports/cucumber-report.json',
        'html:reports/cucumber-report.html',
        'junit:reports/cucumber-report.xml'
      ],
      publishQuiet: true,
      timeout: 60000
    }
  };
  