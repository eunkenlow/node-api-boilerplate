const axios = require('axios');
const uuid = require('uuid');
const util = require('util');
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  format: format.json(),
  transports: [new transports.Console()],
});

class Utils {
  static async request(name, options) {
    const req = `${name} [${uuid.v4()}]:`;
    const path = options.url.split('/').slice(3).join('/');
    Utils.log(`${req} ${options.method} /${path}`);
    try {
      const res = await axios(options);
      Utils.log(`${req} Response ${Utils.inspect(res.data)}`);
      return res.data;
    } catch (err) {
      if (err.response) {
        Utils.error(`${req} Error ${Utils.inspect(err.response.data)}`);
      }
      throw err;
    }
  }

  static inspect(params) {
    if (!params) { return '{}'; }
    return util.inspect(params, { showHidden: true, depth: null }).replace(/\n/g, '').replace(/\s+/g, ' ');
  }

  static async log(message) {
    logger.info(message);
  }

  static async error(message) {
    logger.error(message);
  }
}

module.exports = Utils;
