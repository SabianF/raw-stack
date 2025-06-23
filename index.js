import dotenv from "dotenv";
import express from "express";
import RoutesRepo from "./src/data/repositories/routes.js";
import Route from "./src/data/models/route.js";
import pages from "./src/presentation/templates/pages.js";
import MiddlewareRepo from "./src/data/repositories/middleware.js";
import Middleware from "./src/data/models/middleware.js";
import logRequests from "./src/data/sources/logger.js";

function runApp() {
  dotenv.config();

  const router = express();
  const port = process.env.PORT;

  includeMiddleware(router);
  includeRoutes(router);

  router.listen(port, () => {
    console.log(`Server started at http://localhost:${port}/`);
  });
}

function includeMiddleware(router) {
  const middleware_repo = new MiddlewareRepo([
    new Middleware({
      name: "Request logger",
      handler: logRequests,
    }),
    new Middleware({
      name: "Static file server",
      handler: express.static("src/data/sources/public"),
    })
  ]);

  middleware_repo.handleMiddleware(router);
}

function includeRoutes(router) {
  const routes_repo = new RoutesRepo([
    new Route({
      name: "Home",
      method: "GET",
      route: "/",
      handler: async (request, response, next) => {
        const home_page = await pages.home({});
        response.send(home_page);
      },
    }),
    new Route({
      name: "Test",
      method: "GET",
      route: "/test",
      handler: async (request, response, next) => {
        const test_page = await pages.tester({});
        response.send(test_page);
      },
    }),
  ]);

  routes_repo.handleRoutes(router);
}

runApp();
