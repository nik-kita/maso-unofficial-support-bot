import { Context, InlineKeyboard } from 'grammy';
import { LINK, MESSAGE, TEXT } from '../const';
import { pre } from '../pre.util';

export function answer_help(ctx: Context) {
    ctx.reply(pre(MESSAGE.youCan, true), {
        parse_mode: 'MarkdownV2',
        reply_markup: new InlineKeyboard()
            .text(TEXT.help, TEXT.help).row()
            .text(TEXT.allWillBeGood, TEXT.allWillBeGood).row()
            .url(TEXT.iWantToBookClass, LINK.maso).row()
            .text(TEXT.weekSchedule, TEXT.weekSchedule).row()
            .text(TEXT.tomorrowSchedule, TEXT.tomorrowSchedule).row()
    });
}
