import { Bot, Context } from 'grammy';
import { answer_allWillBeGood } from './answers/all-will-be-good.answer';
import { answer_help } from './answers/help.answer';
import { MESSAGE, TEXT } from './const';
import { pre } from './pre.util';
import { fn_remember } from './fns/remember.fn';



export function addInlines(bot: Bot) {
    bot.callbackQuery(TEXT.help, (ctx: Context) => {
        fn_remember.clear(ctx);

        answer_help(ctx);
    });
    bot.callbackQuery(TEXT.allWillBeGood, (ctx: Context) => {
        fn_remember.clear(ctx);

        answer_allWillBeGood(ctx);
    });
    bot.callbackQuery(TEXT.weekSchedule, (ctx: Context) => {
        fn_remember.insert(ctx);

        ctx.reply(...pre(MESSAGE.weekSchedule));
    });
    bot.callbackQuery(TEXT.tomorrowSchedule, (ctx: Context) => {
        fn_remember.insert(ctx);

        ctx.reply(...pre(MESSAGE.tomorrowSchedule));
    });
}
