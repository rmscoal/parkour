/**
 * getPagination is used the use later on during the query to the
 * designated model using the limit and offset.
 * @param {Integer} page defines the current page of total pages
 * @param {Integer} size defines the paginate number
 * @returns {Object}
 */
const getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? (page - 1) * limit : 0;

  return { limit, offset };
};

module.exports = getPagination;
