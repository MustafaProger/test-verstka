const fs = require("fs");
const path = require("path");
const CleanCSS = require("clean-css");

const scriptDir = __dirname;
const projectRoot = path.join(scriptDir, "..");
const mainCssFile = path.join(projectRoot, "styles", "style.css");
const outputFile = path.join(projectRoot, "styles", "styles.min.css");

console.log("=== CSS Build Started ===");
console.log("Main CSS:", mainCssFile);
console.log("Output file:", outputFile);

if (!fs.existsSync(mainCssFile)) {
	console.error("❌ Main CSS file not found!");
	process.exit(1);
}

const mainCssContent = fs.readFileSync(mainCssFile, "utf8");
console.log(`Main CSS size: ${mainCssContent.length} bytes`);

const importRegex = /@import\s+url\(['"]?(.+?)['"]?\)\s*;/g;
let cssContent = "";
let match;
let importedFiles = 0;

while ((match = importRegex.exec(mainCssContent)) !== null) {
	const importPath = path.join(path.dirname(mainCssFile), match[1]);

	try {
		if (fs.existsSync(importPath)) {
			const fileContent = fs.readFileSync(importPath, "utf8");
			cssContent += fileContent + "\n";
			importedFiles++;
			console.log(
				`✔ Added: ${path.relative(projectRoot, importPath)} (${
					fileContent.length
				} bytes)`
			);
		} else {
			console.warn(
				`⚠ File not found: ${path.relative(projectRoot, importPath)}`
			);
		}
	} catch (e) {
		console.error(`❌ Error reading ${importPath}:`, e);
	}
}

if (importedFiles === 0) {
	console.error("❌ No CSS files were imported!");
	process.exit(1);
}

console.log(
	`Total imported CSS: ${cssContent.length} bytes from ${importedFiles} files`
);

const minified = new CleanCSS({
	level: 2,
	returnPromise: false,
}).minify(cssContent);

if (minified.errors && minified.errors.length > 0) {
	console.error("Minification errors:", minified.errors);
	process.exit(1);
}

fs.writeFileSync(outputFile, minified.styles, "utf8");
console.log(
	`✅ Minified CSS saved (${minified.styles.length} bytes, ${Math.round(
		(1 - minified.styles.length / cssContent.length) * 100
	)}% reduction)`
);
console.log("=== Build Complete ===");
