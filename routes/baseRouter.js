const { AppError } = require('../services/appError');
const Validator = require('../middlewares/validator');

class BaseRouter {
  constructor(version, router) {
    this.version = version;
    this.router = router;
  }

  static add(router, VersionRouter) {
    (new VersionRouter(router)).init();
  }

  route(options) {
    const {
      base = '',
      controller = {},
      schemas = {},
      routes = [],
    } = options;

    const validators = [Validator.build(schemas)];

    routes.forEach((route) => {
      if (controller[route.func]) {
        const path = `/${this.version}/${base}${route.path}`;
        const validator = validators.map(v => v[route.func]).filter(v => !!v);
        this.createRoute(route.method, path, validator, controller[route.func]);
      }
    });
  }

  createRoute(method, path, validator, controller) {
    this.router[method](path, validator, async (req, res) => {
      try {
        await Promise.resolve(controller(req, res));
      } catch (err) {
        const error = AppError.wrap(err);
        res.status(error.status).json(error);
      }
    });
  }
}

module.exports = BaseRouter;
