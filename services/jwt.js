const jwt = require('jsonwebtoken');
const { Token } = require('../models');

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY;

class JWT {
  static async issue(userId, createdBy) {
    const token = await Token.query()
      .insert({ userId, createdBy });

    const accessToken = jwt.sign({}, accessTokenSecret, {
      issuer: 'Node Api Boilerplate Api',
      expiresIn: accessTokenExpiry,
      subject: userId,
      algorithm: 'HS512',
      jwtid: token.id,
    });

    return { accessToken };
  }
}

module.exports = JWT;
