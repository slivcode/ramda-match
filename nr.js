module.exports = {
	clean: [
		`rm -rf lib`
	],
	compile: [
		`tsc -d --outDir lib`
	],
	prepack: [`@compile`],
	dev: [
		`jest --no-watchman --watch src/`
	]
};