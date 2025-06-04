const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://dev-appsrv.rippelsoft.com:5001',
      changeOrigin: true,
      secure: false,
    })
  );
};