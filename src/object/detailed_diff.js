import addedDiff from './added_diff';
import deletedDiff from './deleted_diff';
import updatedDiff from './updated_diff';

const detailedDiff = (lhs, rhs) => ({
  added: addedDiff(lhs, rhs),
  deleted: deletedDiff(lhs, rhs),
  updated: updatedDiff(lhs, rhs)
});

export default detailedDiff;
