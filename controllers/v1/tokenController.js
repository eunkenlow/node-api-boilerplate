const { HttpStatus } = require('../../services/appError');
const TokenService = require('../../services/v1/tokenService');

class TokenController {
  static async create(req, res) {
    const { type, token } = req.body;
    const tokens = await TokenService.create(type, token);

    res.status(HttpStatus.Ok).json({ data: tokens });
  }

  static async destroy(req, res) {
    const { tokenId, userId } = req;
    await TokenService.destroy(tokenId, userId);

    res.status(HttpStatus.NoContent).send('');
  }
}

const TokenSchemas = {
  create: {
    properties: {
      type: { enum: ['facebook'] },
      token: { type: 'string' },
    },
    required: ['type', 'token'],
  },
};

module.exports = { TokenController, TokenSchemas };
