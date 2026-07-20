---
name: Discord Bot Development
description: Design, build, configure, and finish a Discord bot end to end — command and interaction design, gateway and intents setup, permissions and role model, slash commands, moderation and safety, and deployment. Architected for stability and growth, compliant with Discord's rules. For developers and community builders shipping a Discord bot.
audience: backend developer · community builder · bot developer
---

# Discord Bot Development

## What this is

A method for building a complete Discord bot rather than a half-finished script. It covers the interaction design (slash commands, buttons, modals), the gateway and intents the bot actually needs, a permission and role model that follows least privilege, moderation and safety features, and a deployment that stays up. It's structured so a community bot grows cleanly — new commands and features are additions — and so it behaves correctly under Discord's rate limits, intents, and terms.

## What this is NOT

Not affiliated with or endorsed by Discord, and not a substitute for the official Discord Developer documentation, which changes. Not a licence to request every privileged intent "just in case" — intents are least-privilege, and message-content and presence intents require justification. Not a tool for spam, mass-DMing, or self-bots, all of which violate Discord's terms and get bots and accounts banned. It won't promise verification or growth; it makes the bot correct and shippable, not popular.

## Method

1. **Design the interaction surface.** Slash commands with clear names and options, buttons/select menus/modals where they help, and ephemeral responses where privacy matters — a discoverable, typed command set over hidden prefix commands.
2. **Set gateway and intents to least privilege.** Enable only the intents the features need; treat privileged intents (message content, presence, members) as opt-in with justification, because Discord gates them.
3. **Model permissions and roles carefully.** The bot's own permissions least-privilege; command-level permission checks; and a role model that can't be escalated by a crafted input. Never run the bot as administrator by default.
4. **Build moderation and safety in.** Rate-limit user actions, validate input, and provide audit-friendly moderation (who did what) — a community bot is a trust surface, and destructive moderation actions confirm before firing.
5. **Handle Discord's rate limits and events.** Respect global and per-route limits with backoff, handle gateway reconnects and resumes, and make event handling idempotent so a reconnect doesn't double-act.
6. **Architect for growth.** Separate the Discord layer from business logic, structure commands as modules, and persist durable state so restarts and new features don't lose data or require rewrites.
7. **Secure it.** Bot token in a secret store, no token in code or logs, input untrusted, and admin commands gated — the token is the whole castle.
8. **Deploy and operate.** A hosting setup that stays up, logging and error alerting, command registration (global vs guild) handled correctly, and a privacy note if you store user data.

## Quality bar

The interaction surface is typed, discoverable, and uses slash commands/components appropriately · intents are least-privilege with privileged intents justified · the bot's permissions and role model follow least privilege and resist escalation · moderation is safe, rate-limited, and audit-friendly with destructive actions confirmed · Discord rate limits and gateway reconnects are handled idempotently · the architecture separates platform from logic for growth · the token is in a secret store and never logged · deployment has logging, alerting, and correct command registration.

## Guardrails & escalation

A working method, not the specification — verify against the current Discord Developer documentation and terms. Respect Discord's rules: no self-bots, no spam, no mass-DM, privileged intents only with justification. The bot token stays in a secret store and is never committed or logged; destructive moderation and admin actions confirm and never run unattended. Where the bot stores personal data, privacy obligations apply. Verification and growth are not guaranteed.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Primary source: the Discord Developer documentation (discord.com/developers/docs) — verify against the current version. Related: the Telegram bot development and Slack ops-automation skills.
