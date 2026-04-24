const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // 1. Lấy toàn bộ header
  const authHeader = req.headers.authorization;

  // 2. Kiểm tra xem có header không và có bắt đầu bằng "Bearer " không
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token' });
  }

  // 3. Cắt bỏ chữ "Bearer " (lấy phần tử thứ 1 sau dấu cách)
  const token = authHeader.split(' ')[1];

  try {
    // 4. Xác thực token đã được cắt sạch sẽ
    const decoded = jwt.verify(token, process.env.JWT_SECRET.trim());
    req.user = decoded;
    next();
  } catch (err) {
    const secretLen = process.env.JWT_SECRET ? process.env.JWT_SECRET.trim().length : 'undefined';
    console.error("JWT Verify Error:", err.message);
    res.status(401).json({ 
      message: 'Invalid token', 
      debug: {
        error: err.message,
        secretLength: secretLen,
        nodeEnv: process.env.NODE_ENV || 'not set'
      }
    });
  }
};