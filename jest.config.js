module.exports = {
    "roots": [
        "<rootDir>/src",
        "<rootDir>/tests"
    ],
    "transform": {
        "^.+\\.ts?$": "ts-jest"
    },
    "testMatch": ["<rootDir>/tests/**/*.js"],
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
}
