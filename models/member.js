import checkit from 'checkit';
import bookshelf from '../config/bookshelf';

export default bookshelf.Model.extend({
  tableName: 'members',
  hasTimestamps: true,
  initialize() {
    this.on('saving', this.validateSave);
  },

  validateSave() {
    return checkit({ dce: 'required' }).run(this.attributes);
  }
});