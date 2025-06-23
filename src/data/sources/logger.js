import express from "express";

/**
 * Logs timestamp, method, URL
 * @param {express.Request} request
 * @param {express.Response} response
 * @param {express.NextFunction} next
 */
export default function logRequests(request, response, next) {
  const date = new Date();

  let output = [
    date.toLocaleString(),
    `(${Intl.DateTimeFormat().resolvedOptions().timeZone})`,
    request.method,
    request.socket.remoteAddress,
    request.url,
  ].join(" ");

  console.log(output);
  next();
}
