import type {FastifyReply, FastifyRequest} from "fastify";
import type {TcpFloodDto} from "../models/dto/TcpFloodDto.ts";
import {TcpFloodService} from "../services/tcp-flood-service.ts";

export const TcpFloodController = {
    async tcpFloodAttack(req: FastifyRequest<{Body: TcpFloodDto}>, rep: FastifyReply){
        try {
            const dto = req.body;
            const res = await TcpFloodService.tcpFloodAttack(dto);
            return rep.code(200).send(res);
        } catch (err){
            console.error(err);
            rep.code(500).send(err);
        }
    }
}