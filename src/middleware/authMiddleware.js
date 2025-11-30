const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) return res.status(401).json({ message: "Token não enviado" });

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();

  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
