const { HttpStatus } = require('../../services/appError');
const UserService = require('../../services/v1/userService');

class MeController {
  static async get(req, res) {
    const { userId } = req;

    const user = await UserService.getOne(userId);

    res.status(HttpStatus.Ok).json({ data: user });
  }
}

const MeSchemas = {};

module.exports = { MeController, MeSchemas };
