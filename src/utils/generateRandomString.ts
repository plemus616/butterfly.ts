import { randomBytes } from 'crypto';

export function generateRandomString(packetSize: number) {
    return randomBytes(packetSize).toString('base64').slice(0, packetSize);
}

