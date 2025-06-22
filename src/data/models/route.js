import express from "express";

export default class Route {
  /**
   * @type {string}
   */
  name;

  /**
   * @type {string}
   */
  route;

  /**
   * @type {express.RequestHandler}
   */
  handler;

  /**
   *
   * @param {object} props
   * @param {string} props.name
   * @param {string} props.method
   * @param {string} props.route
   * @param {express.RequestHandler} props.handler
   */
  constructor(props) {
    const {
      name,
      method,
      route,
      handler,
    } = props;

    validateRoute(props);

    this.name = name;
    this.method = method.toUpperCase();
    this.route = route;
    this.handler = handler;
  }

  /**
   * @throws if invalid
   */
  validate() {
    validateRoute(this);
  }
}

/**
 *
 * @param {Route} route
 *
 * @throws if invalid
 */
function validateRoute(route) {
  if (!route.method || route.method.length === 0) {
    switch (route.method.toUpperCase()) {
      case "GET":
      case "HEAD":
      case "OPTIONS":
      case "TRACE":
      case "PUT":
      case "DELETE":
      case "POST":
      case "PATCH":
      case "CONNECT":
        break;

      default:
        throw new Error("valid method not provided");
    }
  }

  if (!route.route || route.route.length === 0) {
    throw new Error("valid route not provided");
  }

  if (!route.handler) {
    throw new Error("valid handler not provided");
  }
}
