# Deno grammY Middlewares

A port of [grammy-middlewares](https://github.com/backmeupplz/grammy-middlewares) for [Deno](https://deno.land) users of [grammY](https://grammy.dev), with fixes and additional functionality.

## Motivation

- [issue #4](https://github.com/backmeupplz/grammy-middlewares/issues/4) in the original repository. The issue has been unresolved for over a year and involves a dependency that isn't necessary on Deno so we can remove the dependency and fix the issue.
- Some functions weren't working properly in Deno, such as `onlyAdmin`.
- `onlySuperAdmin` was inconsistent as it lacked the `errorHandler` many other middlewares had.
- `onlySuperAdmin` now also supports an array of super admins.s
- `onlyPublic` existed and `onlyPrivate` felt a natural addition.

## Usage

```ts
import {
  ignoreOld,
  onlyAdmin,
  onlyPublic,
  onlyPrivate,
  onlySuperAdmin,
  sequentialize,
  onlyMenuAuthor,
} from "https://deno.land/x/grammy_middlewares/mod.ts";

// ...

bot.use(
  ignoreOld(),
  onlyAdmin(ctx => ctx.reply(
    'Only admins can do this'
  )),
  onlyPublic(ctx => ctx.reply(
    'You can only use public chats'
  )),
  onlyPrivate(ctx => ctx.reply(
    'You can only use private chats'
  )),
  onlySuperAdmin(env.SUPER_ADMIN_ID),
  sequentialize()
);

// ...

menu.text(
  'Only menu creator',
  onlyMenuAuthor(ctx =>
    ctx.reply('Only menu creator can do this')
  ),
  ctx => // ...
);
```

## Middlewares

### `ignoreOld`

Ignores old updates, useful when bot has been down for a while. You can optionally specify the timeout in seconds which defaults to `5 * 60`.

### `onlyAdmin`

Checks if the user is an admin. You can optionally specify `errorHandler` that is called with the context if the user is not an admin.

### `onlyPublic`

Checks if it is a group chat or a channel. You can optionally specify `errorHandler` that is called with the context if it is not a group chat or a channel.

### `onlyPrivate` ✨ (New)

Checks if it is a private chat. You can optionally specify `errorHandler` that is called with the context if it is not a private chat.

### `onlySuperAdmin`

Checks if the user is a super admin. You have to provide the super admin id.

✨ Now supports an optional `errorHandler` for consistency with other middlewares.

### `sequentialize`

The basic [sequentialize](https://grammy.dev/advanced/scaling.html#concurrency-is-hard) middleware that takes the chat id as a sequential identifier.

- [ ] TODO: Update when grammY 2.0 is released.

### `onlyMenuAuthor`

[@grammyjs/menu](https://github.com/grammyjs/menu) middleware that checks if the user sending the callback is the menu author. To use it the menu has to reply to the menu caller.

## License

MIT — use for any purpose. Would be great if you could leave a note about the original developers. Thanks!

Original package by [@backmeupplz](https://github.com/backmeupplz)  
Ported, fixed and enhanced by [@adriangalilea](https://github.com/adriangalilea)
