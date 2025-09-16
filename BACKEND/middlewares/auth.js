import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
  const {token} = req.headers


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export default userAuth;
