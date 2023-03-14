import { Context, InlineKeyboard } from 'grammy';
import { TEXT } from '../const';
import { pre } from '../pre.util';

export function answer_proposeHelp(ctx: Context) {
    ctx.reply(pre('0_o', true), {
        parse_mode: 'MarkdownV2',
        reply_markup: new InlineKeyboard()
            .text(TEXT.help, TEXT.help),
    });
}
