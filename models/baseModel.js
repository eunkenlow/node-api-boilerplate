const { Model } = require('objection');

class BaseModel extends Model {
  $beforeUpdate() {
    this.updatedAt = new Date();
  }
}

module.exports = BaseModel;
