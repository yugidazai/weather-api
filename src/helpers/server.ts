import * as express         from "express";
import * as cookieParser    from "cookie-parser";
import * as bodyParser      from "body-parser";
import * as errorHandler    from "errorhandler";
import * as cors            from "cors";
import { Request }          from "express";
import { Logger }           from "./log";

interface IServerOptions {
  port: Number;
  router: express.Router;
  locals: any;
  cors_options?: any;
  preInit?: Function;
  postInit?: Function;
}

function _preInit(app: express.Application, done: Function): void {
  done();
}

function _postInit(app: express.Application, done: Function): void {
  done();
}

export class Server {

  constructor (options: IServerOptions) {
    const preInit = options.preInit || _preInit;
    const postInit = options.postInit || _postInit;
    const { port, router, cors_options } = options;
    new Logger().replaceConsole();
    /**
     * Create Express server.
     */
    const app: express.Application = express();
    app.set("port", process.env.PORT ||  options.port || 5000);
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    // For cors config options see:
    // https://www.npmjs.com/package/cors#configuration-options
    app.use(cors_options? cors(cors_options) : cors());
    app.options("*", cors());
    app.locals = { ...app.locals, ...options.locals };
    app.use("/", options.router);

    process.on("uncaughtException", err => console.error(err));

    // Perform any pre initialization required
    preInit(app, () => {
      // Start Express server.
      app.listen(app.get("port"), () => {
        console.log(("App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
        // Perform any post initialization required
        postInit(app, () => {});
      });
    });

  }
}
