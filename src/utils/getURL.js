const getURL = (req) => ''.concat(req.protocol, '://', req.get('host'), req.originalUrl);

module.exports = getURL;
