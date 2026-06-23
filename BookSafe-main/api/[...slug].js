const app = require('../server/server');

module.exports = (req, res) => {
  req.url = req.url.replace(/^\/api/, '') || '/';
  return app(req, res);
};
