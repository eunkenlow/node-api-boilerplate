const { AppError, ErrorCode } = require('../appError');
const { User, Token, Authorization } = require('../../models');
const Facebook = require('../facebook');
const JWT = require('../jwt');

class TokenService {
  static async create(type, token) {
    const socialUser = await Facebook.validate(token);
    const {
      id,
      email,
      firstName,
      lastName,
    } = socialUser;

    const authorization = await Authorization.query().findOne({ id, type }).eager('user');

    if (!authorization) {
      const existingUser = await User.query().findOne({ email });

      if (existingUser) throw new AppError(ErrorCode.User.Exists);

      const user = await User.query()
        .insertGraph({
          email,
          firstName,
          lastName,
          authorizations: [{
            id: socialUser.id,
            type,
          }],
        });

      return JWT.issue(user.id, type);
    }

    return JWT.issue(authorization.user.id, type);
  }

  static async destroy(tokenId, userId) {
    return Token.query()
      .patch({ invalidatedAt: new Date() })
      .where({ id: tokenId, userId, invalidatedAt: null });
  }
}

module.exports = TokenService;
