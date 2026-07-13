const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'ავტორიზაცია უარყოფილია, ტოკენი არ არსებობს' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ტოკენიდან ვიღებთ მომხმარებლის ID-ს (req.user.id)
    next();
  } catch (err) {
    res.status(401).json({ message: 'ტოკენი არ არის ვალიდური' });
  }
};

module.exports = isAuth;