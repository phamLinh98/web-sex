export function notFoundMiddleware(req, res, next) {
  return res.status(404).json({ message: "Route Not Found" });
}

export function errorHandlerMiddleware(err, req, res, next) {
  return res.status(500).json({ message: err.message });
}

export const errorMiddlewares = [notFoundMiddleware, errorHandlerMiddleware];
