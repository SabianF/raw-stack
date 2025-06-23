import dotenv from "dotenv";
import express from "express";
import RoutesRepo from "./src/data/repositories/routes.js";
import Route from "./src/data/models/route.js";
import pages from "./src/presentation/templates/pages.js";

function runApp() {
  dotenv.config();

  const router = express();
  const port = process.env.PORT;
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
  ]);

  routes_repo.handleRoutes(router);

  router.listen(port, () => {
    console.log(`Server started at http://localhost:${port}/`);
  });
}

runApp();
