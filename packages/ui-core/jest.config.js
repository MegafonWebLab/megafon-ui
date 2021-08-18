module.exports = {
    globalSetup: '<rootDir>/scripts/globalSetup.ts',
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/scripts/styleMock.ts',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/scripts/fileMock.ts',
    },
    moduleDirectories: ['node_modules', 'src'],
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
    coverageDirectory: 'coverage',
    testURL: 'http://localhost/',
    roots: ['<rootDir>/src'],
    transform: {
        '\\.tsx?$': ['babel-jest', { rootMode: 'upward' }],
    },
    testPathIgnorePatterns: ['/node_modules/', '/lib/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    setupFilesAfterEnv: ['<rootDir>/scripts/setupEnzyme.ts'],
}
