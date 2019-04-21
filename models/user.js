const BaseModel = require('./baseModel');

class User extends BaseModel {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    return {
      tokens: {
        relation: BaseModel.HasManyRelation,
        modelClass: `${__dirname}/token`,
        join: {
          from: 'users.id',
          to: 'tokens.userId',
        },
      },
      authorizations: {
        relation: BaseModel.HasManyRelation,
        modelClass: `${__dirname}/authorization`,
        join: {
          from: 'users.id',
          to: 'authorizations.userId',
        },
      },
    };
  }
}

module.exports = User;
