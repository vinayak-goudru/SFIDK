const fs = require('fs');
const js = fs.readFileSync('c:/Users/USER/OneDrive/Desktop/DK/js/admin.js', 'utf8');

const lines = js.split('\n');
console.log('Total lines:', lines.length);

for (let i = 1360; i < 1565; i++) {
  if (i >= lines.length) break;
  if (i === 1360 || i === 1367 || i === 1408 || i === 1475 || i === 1485 || i === 1550 || i === 1555 || i === 1560) {
    console.log(i + ': ' + lines[i]);
  }
}
