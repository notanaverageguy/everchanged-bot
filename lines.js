const fs = require('fs');
const path = require('path');

let lineCount = 0;

function readDirectory(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    files.forEach((file) => {
      if (file === 'node_modules') {
        return;
      }
      const filePath = path.join(dir, file);
      fs.stat(filePath, (error, stats) => {
        if (error) {
          console.error(error);
          return;
        }
        if (stats.isDirectory()) {
          readDirectory(filePath);
        } else if (stats.isFile()) {
          fs.readFile(filePath, 'utf-8', (readError, data) => {
            if (readError) {
              console.error(readError);
              return;
            }
            const lines = data.split('\n').length;
            lineCount += lines;
          });
        }
      });
    });
  });
}

readDirectory('./');

process.on('exit', () => {
  console.log(`Total lines: ${lineCount}`);
});
