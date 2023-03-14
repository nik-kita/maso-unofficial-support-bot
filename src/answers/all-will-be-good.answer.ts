import { Context } from 'grammy';
import { pre } from '../pre.util';
import { MESSAGE } from '../const';

export function answer_allWillBeGood(ctx: Context) {
    ctx.reply(...pre(MESSAGE.allWillBeGood));
}
