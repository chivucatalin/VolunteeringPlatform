const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

//creeaza un proxy pentru a putea apela http request-urile din backend
const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:9526';

const context =  [
    "/weatherforecast",
    "/api",
    "/events",
    "/users",
    "/ChatRoom",
    "/Message",
    "/chathub",
    "/JoinedEvent",
    "/eventphoto",
];

module.exports = function(app) {
  const appProxy = createProxyMiddleware(context, {
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive',
      Accept: '*/*',
    }
  });

  app.use(appProxy);
};
