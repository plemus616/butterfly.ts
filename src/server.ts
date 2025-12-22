import Fastify from 'fastify';
import {routes} from "./routes/routes.ts";
import fastifyWebsocket from "@fastify/websocket";
import {wsListenerService} from "./services/ws-listener-services.ts";
const app = Fastify({logger:true});
await app.register(fastifyWebsocket);
await app.register(routes, {prefix: "/api"});
await wsListenerService();
app.listen({port:6666, host:'0.0.0.0'}, (err)=>{
    if(err){
        app.log.error(err);
        process.exit(1);
    }
});