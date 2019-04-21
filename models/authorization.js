const BaseModel = require('./baseModel');

class Authorization extends BaseModel {
  static get tableName() {
    return 'authorizations';
  }

  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: `${__dirname}/user`,
        join: {
          from: 'authorizations.userId',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = Authorization;
