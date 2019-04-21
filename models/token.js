const BaseModel = require('./baseModel');

class Token extends BaseModel {
  static get tableName() {
    return 'tokens';
  }

  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: `${__dirname}/user`,
        join: {
          from: 'tokens.userId',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = Token;
