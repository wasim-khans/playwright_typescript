const fs = require('fs');
const path = require('path');

function loadJsonIfPresent(fileName, fallback) {
    const filePath = path.resolve(__dirname, '../testdata', fileName);

    if (!fs.existsSync(filePath)) {
        return fallback;
    }

    return require(filePath);
}

const testData = loadJsonIfPresent('e2eData.json', {
    url: 'https://rahulshettyacademy.com/client',
    productName: 'ZARA COAT 3',
    email: '',
    password: ''
});

const emptyRole = { email: '', password: '' };
const secrets = loadJsonIfPresent('secrets.json', {
    adminRole: emptyRole,
    managerRole: emptyRole,
    defaultRole: emptyRole
});

module.exports = { testData, secrets };
