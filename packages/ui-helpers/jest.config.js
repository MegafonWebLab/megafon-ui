module.exports = {
    "moduleDirectories": [
        "node_modules",
        "src"
    ],
    "collectCoverageFrom": [
        "src/**/*.{ts,tsx}",
    ],
    "coverageDirectory": "coverage",
    "testURL": "http://localhost/",
    "roots": [
        "<rootDir>/src"
    ],
    "transform": {
        "\\.tsx?$": ["babel-jest", {"rootMode": "upward"}]
    },
    "testPathIgnorePatterns": [
        "node_modules/",
    ],
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    "snapshotSerializers": [
        "enzyme-to-json/serializer"
    ],
    "setupFilesAfterEnv": [
        "<rootDir>/scripts/setupEnzyme.ts"
    ]
}
