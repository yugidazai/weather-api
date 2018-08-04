import { Logger as WinstonLogger, transports } from "winston";

const defaultConfig = {
  transports: [
    new transports.Console({
      timestamp: true,
      level: "debug",
      humanReadableUnhandledException: true,
      colorize: true,
      prettyPrint: true
    })
  ]
};

export class Logger extends WinstonLogger {
  constructor(config = {}) {
    super({ ...defaultConfig, ...config });
  }

  public replaceConsole = (): void => {
    // Enhance the standard console with winston
    const methods = ["info", "debug", "warn", "error"].forEach(method => {
      console[method] = this[method];
    });
    // Make the default console.log into info level
    console.log = this["info"];
  }

}
