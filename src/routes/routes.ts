import type {FastifyInstance} from "fastify";
import {BotController} from "../controllers/bot-controller.ts";
import {HttpFloodController} from "../controllers/http-flood-controller.ts";

export async function routes(app: FastifyInstance){
    app.post("/spam-bots", BotController.spamBots)
    app.post("/http-flood", HttpFloodController.httpFloodAttack)
}