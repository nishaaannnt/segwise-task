const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  let bearerToken =  req.headers['authorization']  || req.cookies?.token;
  if(!bearerToken) {
    return res.status(401).json({message:"No Bearer Token provided"});
  }
  const token = bearerToken.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({message:"No Token provided"});
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; 
    next(); 
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { authMiddleware };