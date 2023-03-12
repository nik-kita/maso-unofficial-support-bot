import { config } from 'dotenv';
import { Bot, NextFunction } from 'grammy';
import { addInlines } from './add-inlines.fn';
import { answer_help } from './answers/help.answer';
import { pre } from './pre.util';
import { fn_remember } from './fns/remember.fn';

config();

async function main() {

    const bot = new Bot(process.env.BOT_TOKEN);


    bot.on('message', async (ctx, next) => {

        await next();
    }).on('message:text', (ctx, next) => {
        ctx.reply(...pre(ctx.message.text));

        fn_remember.upsert(ctx);

        next();
    });

    bot.command(['help', 'start'], answer_help, (ctx, next: NextFunction) => {
        fn_remember.clear(ctx);

        answer_help(ctx);
    });


    addInlines(bot);

    await bot.start();
}

main();
