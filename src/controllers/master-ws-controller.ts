import type {FastifyRequest} from "fastify";
import type {WebSocket} from "@fastify/websocket";
const wsPool = new Map<WebSocket, string>();
export const MasterWsController = {
    async masterWs(socket: WebSocket, req: FastifyRequest<{Params: {type: "master" | "listener"}}>){
        socket.send("Conectado al websocket");
        const type = req.params.type;
        if(!type){
            socket.close();
        }

        if(!wsPool.has(socket)){
            wsPool.set(socket, type);
        }
        socket.on("message", async (message: any) =>{
            if(MasterWsController.isMaster(socket)){
                const payload = message.toString();
                await MasterWsController.broadcast(payload, "listener")
            } else {
                const payload = message.toString();
                await MasterWsController.broadcast(payload, "master")
            }
        });

        socket.on("close", ()=>{
            wsPool.delete(socket);
        });

    },
    async broadcast(message: string, typews: string){
      for await (const [ws, type] of wsPool){
            if(type === typews){
                ws.send(message);
            }
      }
    },
    isMaster(socket: WebSocket){
        const ws = wsPool.get(socket)
        return ws === "master";
    }
}