import { Bot, NextFunction } from 'grammy';
import { addInlines } from './add-inlines.fn';
import { answer_help } from './answers/help.answer';
import { fn_remember } from './fns/remember.fn';
import { pre } from './pre.util';

export function configureBot(bot: Bot) {
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
}
