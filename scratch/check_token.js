const jwt = require('jsonwebtoken');
const secret = 'lumina_super_secret_jwt_key_2026';
const payload = { id: 1, iat: 1777028072, exp: 1777632872 };
const token = jwt.sign(payload, secret);
console.log(token);
