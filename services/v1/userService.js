const { User } = require('../../models');

class TokenService {
  static async getOne(userId) {
    const user = await User.query().findById(userId);
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}

module.exports = TokenService;
