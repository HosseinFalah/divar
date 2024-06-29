const { Router } = require("express");

const { AuthRouter } = require("../modules/auth/auth.routes");
const { UserRouter } = require("../modules/user/user.routes");
const { CategoryRouter } = require("../modules/category/category.routes");
const { OptionRoutes } = require("../modules/option/option.routes");

const mainRouter = Router();

mainRouter.use('/auth', AuthRouter);
mainRouter.use('/user', UserRouter);
mainRouter.use('/category', CategoryRouter);
mainRouter.use('/option', OptionRoutes);

module.exports = mainRouter;