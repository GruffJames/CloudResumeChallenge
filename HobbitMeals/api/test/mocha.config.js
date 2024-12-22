export default {
    require: ['chai/register-assert', 'chai/register-expect', 'chai/register-should'], // Include Chai globally
    spec: 'test/**/*.test.js', // Location of test files
    recursive: true,            // Search subdirectories for tests
    timeout: 5000,              // Test timeout in milliseconds
    reporter: 'spec',           // Use 'spec' as the reporter for test results
    ui: 'bdd',                  // Use 'bdd' style (describe/it)
    loader: 'esm', 
  };
  