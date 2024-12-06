const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../templates');
const destDir = path.join(__dirname, '../dist/src/templates');

// Recursively copy directories and files
function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  fs.readdirSync(src).forEach((item) => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    if (fs.lstatSync(srcPath).isDirectory()) {
      // Recurse into subdirectory
      copyRecursiveSync(srcPath, destPath);
    } else {
      // Copy file
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// Ensure the destination directory exists
fs.mkdirSync(destDir, { recursive: true });

// Perform the recursive copy
copyRecursiveSync(srcDir, destDir);

console.log('Templates copied recursively to dist/src/templates');