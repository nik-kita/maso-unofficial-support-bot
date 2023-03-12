import { Context, InlineKeyboard } from 'grammy';
import { LINK, MESSAGE, TEXT } from '../const';

export function answer_help(ctx: Context) {
    ctx.reply(MESSAGE.youCan, {
        reply_markup: new InlineKeyboard()
            .text(TEXT.help, TEXT.help).row()
            .text(TEXT.allWillBeGood, TEXT.allWillBeGood).row()
            .url(TEXT.iWantToBookClass, LINK.maso).row()
            .text(TEXT.weekSchedule, TEXT.weekSchedule).row()
            .text(TEXT.tomorrowSchedule, TEXT.tomorrowSchedule).row()
    });
}
