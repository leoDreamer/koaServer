const Koa = require("koa");
const router = require("./routers");
const app = new Koa();
const config = require("config-lite");
const kstatic = require("koa-static");
const betterBody = require("koa-better-body");
const loggerMiddleware = require("./middlewares/logger").loggerMiddleware;
const errHandler = require("./middlewares/errorHandler");
const mongoose = require("mongoose");
const task = require("../task");
const render = require("./middlewares/template");

//middlewares
app.use(betterBody());
app.use(kstatic(config.static, { gzip: true }));
app.use(loggerMiddleware);
app.use(errHandler);

// template
app.context.render = render;

//mongodb
mongoose.connect(config.mongo.url);
mongoose.Promise = Promise;
app.context.db = mongoose.connection;

//router
app
  .use(router.routes())
  .use(router.allowedMethods());

task();

module.exports =  app;
