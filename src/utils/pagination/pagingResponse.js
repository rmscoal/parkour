/**
 * pagingResponse setups the meta object for the response of pagination.
 * @param {Sequelize<Model>} data is the object return from Sequelize
 * @param {Integer} page the requested page
 * @param {Integer} limit the limit generated from requested size
 * @param {String} url the complete url of the request
 * @returns {Object}
 * @example
  *  meta: {
  *    pagination: {
  *      total: 100,
  *      total_page: 4,
  *      page: 1,
  *      per_page: 25,
  *      url: ["$url?page=1", "$url?page=2", ...]
  *    }
  *  }
 */
const pagingResponse = (data, page, limit, url) => {
  const { count: total } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(total / limit);
  const regex = /[&,?]{1}page=\d{1,}/ig;
  const sanitizedURL = url.replaceAll(regex, '');
  const hasQuery = sanitizedURL.match(/\?/);
  const urls = [];
  for (let i = 1; i <= totalPages; i += 1) {
    if (i !== currentPage) {
      if (hasQuery) {
        urls.push(sanitizedURL.concat(`&page=${i}`));
      } else {
        urls.push(sanitizedURL.concat(`?page=${i}`));
      }
    }
  }

  return {
    total, total_page: totalPages, page: currentPage, per_page: limit, url: urls,
  };
};

module.exports = pagingResponse;
