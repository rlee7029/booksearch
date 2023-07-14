const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) {

    const { operationName, query } = req.body;
    if (
      query.includes('mutation') &&
      (query.includes('addUser') || query.includes('login'))
    ) {

      console.log('auth addUser/login');
      return; 
    }



    let token = req.headers.authorization || '';

    if (token.startsWith('Bearer ') && token.length>10) {
      // Remove 'Bearer ' from token string
      token = token.slice(7, token.length).trim();
    }  else{
      console.log('Invalid token format. Format should be Bearer <token>')
      throw new Error('Invalid token format. Format should be "Bearer <token>".');
    }

    if (!token) {
      throw new Error('You have no token!');
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });

      req.user = data;
    } catch {
      throw new Error('Invalid token');
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
