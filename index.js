import dotenv from "dotenv";
import express from "express";
import RoutesRepo from "./src/data/repositories/routes.js";
import Route from "./src/data/models/route.js";

function runApp() {
  dotenv.config();

  const router = express();
  const port = process.env.PORT;
  const routes_repo = new RoutesRepo([
    new Route({
      name: "Home",
      method: "GET",
      route: "/",
      handler: (request, response, next) => {
        response.send("Hello");
      },
    }),
  ]);

  routes_repo.handleRoutes(router);

  router.listen(port, () => {
    console.log(`Server started at http://localhost:${port}/`);
  });
}

runApp();
