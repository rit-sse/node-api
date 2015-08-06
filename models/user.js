import checkit from 'checkit';
import bookshelf from '../config/bookshelf';
import paginate from '../helpers/paginate';

export default bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: ['createdAt', 'updatedAt'],
  toJSON() {
    var attrs = bookshelf.Model.prototype.toJSON.apply(this, arguments);
    attrs.createdAt = new Date(attrs.createdAt);
    attrs.updatedAt = new Date(attrs.updatedAt);
    return attrs;
  },
  initialize() {
    this.on('saving', this.validateSave);
  },

  validateSave() {
    return checkit({ dce: 'required' }).run(this.attributes);
  }
}, {
  paginate: paginate
});