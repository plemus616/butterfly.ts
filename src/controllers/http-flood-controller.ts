import type {FastifyReply, FastifyRequest} from "fastify";
import {HttpFloodService} from "../services/http-flood-service.ts";
import type {HttpFloodDto} from "../models/dto/HttpFloodDto.ts";
import {isValidUrlOrDomain} from "../utils/validateHost.ts";

export const HttpFloodController = {
    async httpFloodAttack(req: FastifyRequest<{Body: HttpFloodDto}>, rep: FastifyReply){
        try {
            const {host, packetSize, time} = req.body;
            if(!isValidUrlOrDomain(host)){
                return rep.code(400).send(`Host invalido`);
            }
            const res = await HttpFloodService.httpFloodAttack(host, packetSize, time);
            rep.code(200).send(res);
        } catch (err){
            console.error(err);
            rep.code(500).send(err);
        }
    }
}