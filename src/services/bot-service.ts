import mineflayer, {type Bot} from 'mineflayer';
import type {SpamBotDto} from "../models/dto/BotDto.ts";
import {generateUsername} from "../utils/usernameGenerator.ts";

export const BotService = {
     async spamBots (dto: SpamBotDto){
        const botsConectados: Bot[] = [];
        const qty = dto.amount ?? 10;
        const port = dto.port ?? 25565
        console.log(`Conectando ${qty} bots a ${dto.host} en el puerto ${port}`);

        const botPromises = [];

        for (let i = 1; i <= qty; i++){
           try {
               const botPromise = new Promise<Bot | null>((resolve) => {
                   const bot =  mineflayer.createBot({
                       host: dto.host,
                       port: port,
                       username: generateUsername(),
                       auth: "offline"
                   });

                   bot.once("spawn", () => {
                       console.log(`Bot ${bot.username} conectado exitosamente`)
                       dto.ws.send(`Bot ${bot.username} conectado exitosamente`);
                       botsConectados.push(bot);
                       bot.chat("/register penegigante penegigante")
                       bot.chat("/login penegigante")
                       resolve(bot);
                   });

                   bot.on('error', (err)=>{
                       dto.ws.send(`Bot  ${bot._client.username} fue descontectado: ${err.message}`);
                       console.log(`Bot  ${bot._client.username} fue descontectado: ${err.message}`);
                       resolve(null);
                   });

                   bot.on('kicked', (err)=>{
                       dto.ws.send(`El bot ${bot._client.username} fue kickeado del server: ${
                           JSON.stringify(err) ?? err
                       }`);
                       console.log(`El bot ${bot._client.username} fue kickeado del server: ${
                           JSON.stringify(err) ?? err
                       }`);
                       resolve(null);
                   });
               });

               botPromises.push(botPromise);

               if (i < qty) {
                   await new Promise(resolve => setTimeout(resolve, 5000));
               }
           } catch (err){
               console.error(err);
           }
        }
        await Promise.allSettled(botPromises);

        return `Bots enviados exitosamente: ${botsConectados.length} Bots fallidos: ${qty - botsConectados.length}`;
    }
}