const fs = require('fs');
const path = require('path');

// Update all HTML files: change nav text from "ಜಿಲ್ಲಾ ನಾಯಕತ್ವ" to "ನಾಯಕತ್ವ"
const files = ['index.html', 'committees.html', 'martyrs.html'];
const basePath = path.join(__dirname, '..');

files.forEach(file => {
  const filePath = path.join(basePath, file);
  if (!fs.existsSync(filePath)) {
    console.log('SKIP: ' + file + ' not found');
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  // Replace nav leadership text
  const before = content;
  content = content.replace(/data-i18n="navLeadership">ಜಿಲ್ಲಾ ನಾಯಕತ್ವ/g, 'data-i18n="navLeadership">ನಾಯಕತ್ವ');
  if (content !== before) {
    console.log(file + ': Updated nav text');
  }
  fs.writeFileSync(filePath, content, 'utf8');
});

// Update app.js i18n dictionaries
const appJsPath = path.join(basePath, 'js', 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');

// Update Kannada navLeadership
appJs = appJs.replace(/navLeadership:\s*['"]ಜಿಲ್ಲಾ ನಾಯಕತ್ವ['"]/g, "navLeadership: 'ನಾಯಕತ್ವ'");
// Update English navLeadership
appJs = appJs.replace(/navLeadership:\s*['"]District Leadership['"]/g, "navLeadership: 'Leadership'");

fs.writeFileSync(appJsPath, appJs, 'utf8');
console.log('app.js: Updated i18n navLeadership labels');
console.log('DONE');

