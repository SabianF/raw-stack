import dotenv from "dotenv";
import express from "express";
import RoutingRepo from "./src/data/repositories/routing.js";
import Route from "./src/data/models/route.js";
import pages from "./src/presentation/pages/pages.js";
import MiddlewareRepo from "./src/data/repositories/middleware.js";
import Middleware from "./src/data/models/middleware.js";
import logRequests from "./src/data/sources/logger.js";
import components from "./src/presentation/components/components.js";

function runApp() {
  dotenv.config();

  const router = express();
  const port = process.env.PORT;

  const middleware_repo = new MiddlewareRepo([]);
  const routing_repo = new RoutingRepo([]);

  addAllMiddleware(middleware_repo);
  middleware_repo.handleMiddleware(router);

  addAllRoutes(routing_repo);
  routing_repo.handleRoutes(router);

  router.listen(port, () => {
    console.log(`Server started at http://localhost:${port}/`);
  });
}

/**
 *
 * @param {MiddlewareRepo} middleware_repo
 */
function addAllMiddleware(middleware_repo) {
  middleware_repo.addMiddleware(
    new Middleware({
      name: "Request logger",
      handler: logRequests,
    }),
  );

  middleware_repo.addMiddleware(
    new Middleware({
      name: "Static file server",
      handler: express.static("src/data/sources/public"),
    })
  );
}

/**
 *
 * @param {RoutingRepo} routing_repo
 */
function addAllRoutes(routing_repo) {
  routing_repo.addRoute(
    new Route({
      name: "Home",
      method: "GET",
      route: "/",
      handler: async (request, response, next) => {
        const home_page = await pages.home();
        response.send(home_page);
      },
    }),
  );

  routing_repo.addRoute(
    new Route({
      name: "Tester",
      method: "GET",
      route: "/tester",
      handler: async (request, response, next) => {
        const test_page = await pages.tester({
          loader_url: "/api/tester/content",
        });
        response.send(test_page);
      },
    }),
  );

  routing_repo.addRoute(
    new Route({
      name: "Tester body",
      method: "GET",
      route: "/api/tester/content",
      handler: async (request, response, next) => {
        const tester_content = await pages.tester({
          body_only: true,
        });
        response.send(tester_content);
      },
    })
  );
}

runApp();
