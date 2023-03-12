import { Context } from 'grammy';
import { answer_help } from '../answers/help.answer';

const remembers = new Map<number, ReturnType<typeof setTimeout>>();
const TIME = 3_000;


function upsert(ctx: Context) {
    const { id } = ctx.chat!;
    const lastRemember = remembers.get(id);

    if (lastRemember) {
        clearInterval(lastRemember);
        remembers.delete(id);
    }

    remembers.set(id, setTimeout(() => {
        answer_help(ctx);
        remembers.delete(id);
    }, TIME));
}

function insert(ctx: Context) {
    const { id } = ctx.chat!;
    const lastRemember = remembers.get(id);

    if (lastRemember) return;

    remembers.set(id, setTimeout(() => {
        answer_help(ctx);
        remembers.delete(id);
    }, TIME));
}

function clear(ctx: Context) {
    const { id } = ctx.chat!;
    const lastRemember = remembers.get(id);

    if (lastRemember) {
        clearInterval(lastRemember);
        remembers.delete(id);
    }
}

export const fn_remember = {
    upsert,
    clear,
    insert,
}
