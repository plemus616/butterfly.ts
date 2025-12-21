import Fastify from 'fastify';
import {routes} from "./routes/routes.ts";

const app = Fastify({logger:true});

app.register(routes, {prefix: "/api"});

app.listen({port:6666, host:'0.0.0.0'}, (err)=>{
    if(err){
        app.log.error(err);
        process.exit(1);
    }
});