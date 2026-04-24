const jwt = require('jsonwebtoken');
const secret = 'lumina_super_secret_jwt_key_2026';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzc3MDI4NDc2LCJleHAiOjE3Nzc2MzMyNzZ9.hXSg3qtD4ugZ8Q44KN-MT6X6twPMhzDNiK0q2CDWNzQ';
try {
    const decoded = jwt.verify(token, secret);
    console.log('Valid:', decoded);
} catch (err) {
    console.log('Invalid:', err.message);
}
