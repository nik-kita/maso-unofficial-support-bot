import { config } from 'dotenv';
import express from 'express';
import { Bot, webhookCallback } from 'grammy';
import { request } from 'undici';
import { configureBot } from './counfigure-bot';
import { join } from 'path';
import { appendFileSync } from 'fs';

config();

let offInterval: ReturnType<typeof setInterval>;

async function main() {
    const domain = process.env.DOMAIN;
    const port = +process.env.PORT;
    const secretPath = process.env.BOT_TOKEN;
    const app = express();
    const bot = new Bot(process.env.BOT_TOKEN);

    configureBot(bot);

    app.use(express.json());
    app.use(`/${secretPath}`, webhookCallback(bot, 'express'));
    app.get('/', (_, res) => {
        res.json({
            date: Date.now().toLocaleString(),
            bot_is_inited: bot.isInited(),
            port,
            domain,
        });
    });

    app.listen(port, async () => {
        if (port !== 3000) {
            offInterval = setInterval(() => {
                request(`https://${domain}`)
                    .then(console.log)
                    .catch(console.error);
            }, 15_000);
        }
        // Make sure it is `https` not `http`!
        // await bot.api.setWebhook(`https://${domain}/${secretPath}`);
    });
}

main().catch(() => {
    offInterval && clearInterval(offInterval);
}).finally(() => {
    if (process.env.FIRST) return;

    const __url = `${process.env.DOMAIN}/${process.env.BOT_TOKEN}`;
    const _url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/setWebhook?url=${__url}`;
    const url = encodeURI(_url);

    console.log(url);

    request(url)
        .then(console.log)
        .catch(console.error);

    appendFileSync(join(process.cwd(), '.env'), '\nFIRST=true', { encoding: 'utf-8' });
});
