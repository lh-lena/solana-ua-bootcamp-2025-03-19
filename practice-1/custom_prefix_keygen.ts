import { Keypair } from "@solana/web3.js";
import { createHash } from 'crypto';
import { writeFileSync } from 'fs';

const prefix = "olena";

const hashPrefix = createHash('sha256').update(prefix).digest('hex');
let match = false;
let start, end;

start = new Date();

console.log(`Start keypair generation with required prefix: ${prefix}`);

while (!match)
{
    const keypair = Keypair.generate();
    const publicKey = keypair.publicKey.toBase58();

    if (publicKey.startsWith(hashPrefix)) {
        end = new Date();
        match = true;
        const keypairData = {
            publicKey: keypair.publicKey.toBase58(),
            secretKey: Array.from(keypair.secretKey),
        };
        const path = `./${prefix}-keypair.json`;
        writeFileSync(path, JSON.stringify(keypairData, null, 2));
        console.log(`Keypair generated successfully with required prefix: ${prefix}`);
        printTakenTime(start, end);
        console.log(`Public key: ${publicKey}`);
    }
}

function printTakenTime(start, end)
{
    const diffInMs = end.getTime() - start.getTime();
    if (diffInMs < 1000) {
        console.log(`Operation took ${diffInMs} milliseconds`);
    } else {
        const hours = Math.floor(diffInMs / (1000 * 60 * 60)); // h
        const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60)); // min
        const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000); // sec
        console.log(`Time difference in milliseconds: ${diffInMs} ms`);
        console.log(`Operation took ${hours} hours, ${minutes} minutes, and ${seconds} seconds`);
    }
}