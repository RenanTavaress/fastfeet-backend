const jwt = require('jsonwebtoken');
const yup = require('yup');


const User = require('../models/User');
const auth = require('../../config/auth');

class SessionsController {
   async store(req, res) {
      const schema = yup.object().shape({
         email: yup.string().email().required(),
         password: yup.string().min(6).required(),
      });

      if (!(schema.isValid(req.body))) {
         return res.status(401).json({ error: 'Validation fails' });
      }

      const { password, email } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
         return res.status(401).json({ erro: 'User not Found' });
      }

      if (!(await user.checkPassword(password))) {
         return res.status(401).json({ erro: 'Password found not match' });
      }


      const { id, name } = user;

      return res.json({
         user: {
            id,
            name,
            email,
         },

         token: jwt.sign({ id }, auth.secret, {
            expiresIn: auth.expireIn,
         }),
      });
   }
}
module.exports = new SessionsController();
