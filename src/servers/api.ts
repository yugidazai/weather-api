import * as config from "config";
import api from "../routers/api";
import { Server } from "../helpers/server";

const server = new Server({
  port: config.api.port,
  locals: { config },
  router: api,
  // For cors config options see:
  // https://www.npmjs.com/package/cors#configuration-options
  cors_options: {
    origin: true, // reflect the request origin, as defined by req.header('Origin')
    credentials: true,
    methods: "GET,HEAD,OPTIONS"
  }
});
