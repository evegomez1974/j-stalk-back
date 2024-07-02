export default {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: 'node',
  testResultsProcessor: 'jest-junit',
  // reporters: [
  //   'default',
  //   ['jest-junit', { outputDirectory: 'testsResult', outputName: 'test-junit.xml' }]
  // ]
};
