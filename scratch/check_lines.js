const fs = require('fs');
const js = fs.readFileSync('c:/Users/USER/OneDrive/Desktop/DK/js/admin.js', 'utf8');

const lines = js.split('\n');
for (let i = 1548; i < 1565; i++) {
  console.log(i + ': ' + lines[i]);
}
