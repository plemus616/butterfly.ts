import type {WebSocket} from "@fastify/websocket";

export interface SpamBotDto {
    host: string,
    port?: number,
    amount?: number,
    ws: WebSocket
}