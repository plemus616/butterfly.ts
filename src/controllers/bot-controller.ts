import type {FastifyReply, FastifyRequest} from "fastify";
import type {SpamBotDto} from "../models/dto/BotDto.ts";
import {BotService} from "../services/bot-service.ts";

export const BotController = {
    async spamBots(req: FastifyRequest<{Body: SpamBotDto}>, rep: FastifyReply){
        const data = req.body;
        if(!data.host){
            return rep.code(400).send("La ip del server no fue proveida");
        }
        try{
            const res = await BotService.spamBots(data);
            rep.code(200).send(res);
        } catch (err){
            console.error(err);
            return rep.code(500).send(err);
        }
    }
}