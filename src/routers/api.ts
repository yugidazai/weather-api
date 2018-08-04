import { Router }             from "express";
import * as config            from "config";
import { execute, dispatch }  from "../helpers/router";
import { weather_presenter }  from "../presenters/weather";

const router: Router = Router();

/**
 * Generate and apply the API common routers
 */
router.get(`/`, (req, res) => res.send(`API Running`));

/**
 * GET
 */
// router.get(`/get-weather`, execute(weather_presenter.getWeatherInfo), dispatch());

// Export the express.Router() instance to be used by server.ts
export default router;
