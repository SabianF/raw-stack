import express from "express";
import Middleware from "../models/middleware.js";

export default class MiddlewareRepo {
  /**
   * @type {Middleware[]}
   */
  #middleware

  /**
   *
   * @param {Middleware[]} middleware
   */
  constructor(middleware) {
    this.#middleware = [];

    if (
      !middleware ||
      typeof middleware !== "object" ||
      middleware.constructor.name.toLowerCase() !== "array"
    ) {
      throw new Error("valid middleware array not provided to " + MiddlewareRepo.name);
    }

    for (let i = 0; i < middleware.length; i++) {
      const current_middleware = middleware[i];
      this.addMiddleware(current_middleware);
    }
  }

  /**
   *
   * @param {express.Express} router
   */
  handleMiddleware(router) {
    for (let i = 0; i < this.#middleware.length; i++) {
      const middleware = this.#middleware[i];
      router.use(middleware.handler);
    }
  }

  /**
   *
   * @param {Middleware} middleware
   */
  addMiddleware(middleware) {
    const new_middleware = new Middleware(middleware);

    const existing_middleware = this.#middleware.find(
      current_middleware => current_middleware.name === new_middleware.name
    );
    if (existing_middleware) {
      throw new Error(new_middleware.name + " middleware is already included in " + MiddlewareRepo.name);
    }

    this.#middleware.push(new_middleware);
  }
}
