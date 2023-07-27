module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    "^common(.*)$": "<rootDir>/src/common$1",
    "^pages(.*)$": "<rootDir>/src/pages$1",
    "^store(.*)$": "<rootDir>/src/store$1",
    "^api(.*)$": "<rootDir>/src/api$1",
    "^utils(.*)$": "<rootDir>/src/utils$1",
    "^components(.*)$": "<rootDir>/src/components$1",
    "\\.(css)$": "<rootDir>/__mocks__/styleMock.js",
  },
  "transform": {
    "^.+\\.tsx?$": "babel-jest"
  },
};