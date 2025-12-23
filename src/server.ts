import Fastify from 'fastify';
import {routes} from "./routes/routes.ts";
import fastifyWebsocket from "@fastify/websocket";
import fastifyCors from "@fastify/cors";
import {wsListenerService} from "./services/ws-listener-services.ts";
const app = Fastify({logger:true});
await app.register(fastifyCors, {
   origin: '*',
   methods: ["GET", "POST", "OPTIONS"]
});
await app.register(fastifyWebsocket, {
    options: {
        verifyClient: () => true
    }
});
await app.register(routes, {prefix: "/api"});
await wsListenerService();
app.listen({port:6666, host:'0.0.0.0'}, (err)=>{
    if(err){
        app.log.error(err);
        process.exit(1);
    }
});