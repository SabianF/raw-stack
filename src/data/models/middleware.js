import express from "express";

export default class Middleware {
  /**
   * @type {string}
   */
  name;

  /**
   * @type {express.RequestHandler}
   */
  handler;

  /**
   *
   * @param {object} props
   * @param {string} props.name
   * @param {express.RequestHandler} props.handler
   */
  constructor(props) {
    validateMiddleware(props);

    const {
      name,
      handler,
    } = props;

    this.name = name;
    this.handler = handler;
  }

  validate() {
    validateMiddleware(this);
  }
}

/**
 *
 * @param {Middleware} middleware
 *
 * @throws if invalid
 */
function validateMiddleware(middleware) {
  const {
    name,
    handler,
  } = middleware;

  if (!name || typeof name !== "string" || name.length === 0) {
    throw new Error(`valid name not provided to ${Middleware.name}: [${name}]`);
  }

  if (!handler || typeof handler !== "function") {
    throw new Error(`valid function not provided to ${Middleware.name}: [${handler}]`);
  }
}
