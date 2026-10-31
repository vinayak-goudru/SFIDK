const fs = require('fs');
const path = require('path');

const dsPath = 'c:/Users/USER/OneDrive/Desktop/dyfi karnataka/js/data-store.js';
const content = fs.readFileSync(dsPath, 'utf8');

const targetDir = 'c:/Users/USER/OneDrive/Desktop/DK/images/leaders';
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Find nl1 photo
const nl1Match = content.match(/"id":\s*"nl1"[\s\S]*?"photo":\s*"(data:image\/[^;]+;base64,[^"]+)"/);
if (nl1Match) {
  const base64Data = nl1Match[1].replace(/^data:image\/\w+;base64,/, '');
  fs.writeFileSync(path.join(targetDir, 'rahim.jpg'), Buffer.from(base64Data, 'base64'));
  console.log('Saved rahim.jpg successfully!');
} else {
  console.log('nl1 photo not matched');
}

// Find nl2 photo
const nl2Match = content.match(/"id":\s*"nl2"[\s\S]*?"photo":\s*"(data:image\/[^;]+;base64,[^"]+)"/);
if (nl2Match) {
  const base64Data = nl2Match[1].replace(/^data:image\/\w+;base64,/, '');
  fs.writeFileSync(path.join(targetDir, 'himagnoraj.jpg'), Buffer.from(base64Data, 'base64'));
  console.log('Saved himagnoraj.jpg successfully!');
} else {
  console.log('nl2 photo not matched');
}

