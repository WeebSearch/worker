module.exports = {
	projects: [
		{
			displayName: "worker",
			// runner: "jest-runner-tsc",
			rootDir: "dist/typescript-worker/__tests__",
			testEnvironment: "node"
		}, {
			displayName: "api"
		}
	],
	testEnvironment: "node"
}
