import type {WebSocket} from "@fastify/websocket";

export interface TcpFloodDto {
    host: string,
    port: number,
    time: number,
    packetSize: number,
    ws: WebSocket
}