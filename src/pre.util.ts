import { Context } from 'grammy';


export function pre(msg: string, onlyMessage?: false): [string, any];
export function pre(msg: string, onlyMessage: true): string;
export function pre(msg: string, onlyMessage = false) {
    const message = `
    \`\`\`
    ${msg}
    \`\`\`
        `;

    return onlyMessage
        ? message
    : [
        message,
        { parse_mode: 'MarkdownV2' } satisfies Parameters<Context['reply']>[1],
    ];
}