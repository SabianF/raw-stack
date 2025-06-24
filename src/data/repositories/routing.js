import express from "express";
import Route from "../models/route.js";

export default class RoutingRepo {
  /**
   * @type {Route[]}
   */
  #routes;

  /**
   *
   * @param {Route[]} routes
   */
  constructor(routes) {
    this.#routes = [];

    if (
      !routes ||
      (typeof routes).toLowerCase() !== "object" ||
      routes.constructor.name.toLowerCase() !== "array"
    ) {
      throw new Error("valid routes array not provided to " + RoutingRepo.name);
    }

    for (let i = 0; i < routes.length; i++) {
      const currentRoute = routes[i];
      currentRoute.validate();
      this.#routes.push(currentRoute);
    }
  }

  getRoutes() {
    return structuredClone(this.#routes);
  }

  /**
   *
   * @param {Route} route
   */
  addRoute(route) {
    const new_route = new Route(route);

    const existing_route = this.#routes.find(
      (current_route) => {
        const current_route_id = current_route.method + current_route.route;
        const route_id = route.method + route.route;
        const isMatch = current_route_id === route_id;
        return isMatch;
      }
    );
    if (existing_route) {
      throw new Error(new_route.name + " route is already included in " + RoutingRepo.name);
    }

    this.#routes.push(new_route);
  }

  /**
   * Adds all routes to the appropriate Express properties
   * @param {express.Express} router
   */
  handleRoutes(router) {
    for (const currentRoute of this.#routes) {
      switch (currentRoute.method) {
        case "GET":
          router.get(currentRoute.route, currentRoute.handler);
          break;
        case "HEAD":
          router.head(currentRoute.route, currentRoute.handler);
          break;
        case "OPTIONS":
          router.options(currentRoute.route, currentRoute.handler);
          break;
        case "TRACE":
          router.trace(currentRoute.route, currentRoute.handler);
          break;
        case "PUT":
          router.put(currentRoute.route, currentRoute.handler);
          break;
        case "DELETE":
          router.delete(currentRoute.route, currentRoute.handler);
          break;
        case "POST":
          router.post(currentRoute.route, currentRoute.handler);
          break;
        case "PATCH":
          router.patch(currentRoute.route, currentRoute.handler);
          break;
        case "CONNECT":
          router.connect(currentRoute.route, currentRoute.handler);
          break;

        default:
          console.error(`invalid method for ${this.handleRoutes.name}: [${currentRoute.method}]. The fact this happened means the route was changed AFTER it was validated in the constructor of ${RoutingRepo.name}`);
          break;
      }
    }
  }
}
