import {
  Request,
  Response,
  NextFunction,
} from "express";

function combineRequestParameters(req: Request) {
  let params = {};
  const fields = ["body", "query", "params", "session"];
  fields.forEach(field => {
    const data = req[field];
    if (!data) return;
    for (const key in data) {
      const value = data[key];
      if (typeof value !== "function") {
        params[key] = value;
      }
    }
  });

  return params;
}

export function execute(method: IDefaultFunction): (Request, Response, NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    const params = combineRequestParameters(req);
    try {
      method(params, (err, result) => {
        res.locals.error = err;
        res.locals.result = result;
        next(err);
      });
    } catch (error) {
      res.locals.error = error;
      next(error);
    }
  };
}

export function dispatch(options = {}): (Request, Response, NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.error) {
      res.status(500).send(res.locals.error.message);
    } else {
      res.send(res.locals.result);
    }
  };
}
