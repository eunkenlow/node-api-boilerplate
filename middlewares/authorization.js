const jwt = require('jsonwebtoken');
const { AppError, ErrorCode } = require('../services/appError');
const { Token } = require('../models');

const paths = [
  { method: 'DELETE', path: '/v1/tokens/*' },
  { method: 'GET', path: '/v1/me/*' },
];

class Authorization {
  static async validate(req, res, next) {
    try {
      const auth = paths.some(p => req.method === p.method && !!req.path.match(p.path));

      if (auth) {
        const accessToken = req.header('authorization');
        const decodedToken = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const token = await Token.query().findById(decodedToken.jti);
        if (!token || token.invalidatedAt) {
          throw new AppError(ErrorCode.Auth.BadToken);
        }
        req.userId = token.userId;
        req.tokenId = token.id;
      }

      return next();
    } catch (err) {
      const error = err instanceof AppError ? err : new AppError(ErrorCode.Auth.BadToken);
      return res.status(error.status).json(error);
    }
  }
}

module.exports = Authorization;
