const BaseRouter = require('./baseRouter');
const { TokenController, TokenSchemas } = require('../controllers/v1/tokenController');
const { MeController, MeSchemas } = require('../controllers/v1/meController');

class v1Router extends BaseRouter {
  constructor(router) {
    super('v1', router);
  }

  init() {
    this.route({
      base: 'tokens',
      controller: TokenController,
      schemas: TokenSchemas,
      routes: [
        { method: 'post', path: '/', func: 'create' },
        { method: 'delete', path: '/', func: 'destroy' },
      ],
    });

    this.route({
      base: 'me',
      controller: MeController,
      schemas: MeSchemas,
      routes: [
        { method: 'get', path: '/', func: 'get' },
      ],
    });
  }
}

module.exports = v1Router;
