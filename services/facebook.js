const utils = require('./utils');
const { AppError, ErrorCode } = require('./appError');

class Facebook {
  static async validate(token) {
    try {
      const [user] = await Promise.all([
        Facebook.getUserInfo(token),
        Facebook.verifyToken(token),
      ]);
      return user;
    } catch (err) {
      const error = err instanceof AppError ? err : new AppError(ErrorCode.Social.General, err);
      throw error;
    }
  }

  static async verifyToken(token) {
    try {
      const result = await utils.request('Facebook', {
        method: 'GET',
        url: 'https://graph.facebook.com/v3.2/debug_token',
        params: {
          input_token: token,
          access_token: Facebook.accessToken,
        },
      });

      if (!result.data || !result.data.is_valid) throw new AppError(ErrorCode.Social.BadToken);
    } catch (err) {
      if (err.response && err.response.data.error.code === 100) {
        throw new AppError(ErrorCode.Social.BadToken);
      }
      throw err;
    }
  }

  static async getUserInfo(token) {
    try {
      const data = await utils.request('Facebook', {
        method: 'GET',
        url: 'https://graph.facebook.com/v3.2/me',
        params: {
          fields: 'id, email, first_name, last_name',
          access_token: token,
        },
      });

      if (!data.email) throw new AppError(ErrorCode.Social.MissingEmail);

      return {
        id: data.id,
        type: 'facebook',
        firstName: data.first_name,
        lastName: data.last_name,
        token,
        email: data.email.toLowerCase(),
      };
    } catch (err) {
      if (err.response && err.response.data.error.code === 190) {
        throw new AppError(ErrorCode.Social.BadToken);
      }
      throw err;
    }
  }

  static get accessToken() {
    return `${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_APP_SECRET}`;
  }
}

module.exports = Facebook;
