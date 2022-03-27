require("dotenv").config();

const Koa = require("koa");
const cors = require("koa2-cors");
const variables = require("./variables");
const logMiddleware = require("./middlewares/log");
const logger = require("./logger");
const requestId = require("./middlewares/requestId");
const responseHandler = require("./middlewares/responseHandler");
const router = require("./routes");
const koaBody = require("koa-body");
const db = require("./models");
// db.sequelize.sync();

const app = new Koa();

app.use(koaBody());
app.use(requestId());
app.use(logMiddleware({ logger }));
app.use(cors({ origin: "*" }));
app.use(responseHandler());
app
  .use(router.routes.routers.routes())
  .use(router.routes.routers.allowedMethods());
//Start server
app.listen(variables.appPort, () => {
  logger.info(`API server listening on ${variables.host}:${variables.appPort}`);
});

// Expose app
module.exports = app;
