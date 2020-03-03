const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = async (req, res, next) => {
   const authHeaders = req.headers.authorization;


   if (!authHeaders) {
      return res.status(401).json({ error: 'Token not provider' });
   }

   const [, token] = authHeaders.split(' ');

   try {
      const decoded = await promisify(jwt.verify)(token, authConfig.secret);

      console.log(decoded);
      req.userId = decoded.id;
      return next();
   } catch (err) {
      return res.status(401).json({ error: 'token invalid' });
   }
};
