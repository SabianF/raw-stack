import express from "express";
import Route from "../models/route.js";

export default class RoutesRepo {
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
      throw new Error("valid routes array not provided to " + RoutesRepo.name);
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
          console.error(`invalid method for ${this.handleRoutes.name}: [${currentRoute.method}]. The fact this happened means the route was changed AFTER it was validated in the constructor of ${RoutesRepo.name}`);
          break;
      }
    }
  }
}
