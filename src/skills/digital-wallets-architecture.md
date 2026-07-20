---
name: Digital Wallet Architecture
description: Help a team building a digital wallet reason through every layer before it touches real value — threat model, key management, encryption and secure storage, transaction integrity, the honest limits of what software can guarantee, and the regulatory surface. A design-and-architecture method with security humility, not a security guarantee. For teams building custodial or self-custody wallets.
audience: product designer · security-conscious developer · fintech founder
---

# Digital Wallet Architecture

## What this is

A method for thinking through a digital wallet completely before it moves anyone's money. Wallets fail at the seams — key handling, a compromised host, a swapped address, an unaudited assumption — so this walks the layers in order: threat model first, then key and secret management, encryption and secure storage, transaction construction and integrity (what the user signs is what executes), recovery and backup, and the regulatory surface. Throughout, it names the honest limit: software on a device you don't control cannot promise what a secure element or an audit can, and the method's job is to make those limits explicit, not to paper over them.

## What this is NOT

Not a security guarantee, not an audit, and not a substitute for a professional security review and cryptography expertise before real funds are handled. Not a licence to roll your own crypto — use audited libraries and established schemes; novel cryptography in a wallet is a red flag, not a feature. It does not promise WYSIWYS (what-you-see-is-what-you-sign) on a compromised host, does not claim keys can be perfectly protected in a browser, and is not legal or compliance advice: money transmission, custody, KYC/AML, and securities questions are routed to counsel and licensed specialists. A wallet that ships on this method's output alone, without an external audit, is not ready for real value.

## Method

1. **Threat-model first.** Name the adversaries (malware on the host, phishing, a malicious dependency, a compromised server, a lost device) and what each can do — the architecture is a response to a specific threat model, not a checklist.
2. **Decide the custody model honestly.** Custodial, self-custody, or MPC/multi-sig each move the risk somewhere; state where the keys live, who can move funds, and what the user is trusting — and design the UX so the user actually understands it.
3. **Protect keys as the crown jewels.** Private keys and seeds are never logged, never sent to a server, never in plaintext at rest; use the platform's secure storage / secure element where it exists, and encrypt at rest with an established KDF and authenticated encryption (never home-grown).
4. **Make signing legible and bounded.** The user signs an exact, human-readable payload — amount, recipient, network — not an opaque blob; and recognise the limit: on a compromised host this can be defeated, so raise the cost (allowlists, out-of-band confirmation) rather than claiming it's solved.
5. **Guard transaction integrity.** Defend against address substitution (clipboard/UI tampering), validate every input, use exact approvals rather than unlimited ones, and treat the network layer as hostile.
6. **Design recovery without a backdoor.** Backup and recovery (seed phrases, social/MPC recovery) that the user can actually use, without creating a recovery path an attacker can use too — recovery is where many wallets quietly weaken their own security.
7. **Use audited primitives and dependencies.** Established libraries, pinned and reviewed dependencies (a wallet's supply chain is an attack surface), and no unaudited cryptographic code in the money path.
8. **Map the regulatory and audit surface.** Money transmission, custody rules, KYC/AML, and jurisdictional obligations are identified and routed to counsel; and a professional security audit is scoped before real funds — the architecture is the input to the audit, not a replacement for it.

## Quality bar

A threat model is written before architecture · the custody model is chosen honestly and made legible to the user · keys and seeds are never logged/transmitted/plaintext and use secure storage plus established KDF + authenticated encryption · signing shows an exact human-readable payload and the compromised-host limit is stated, not hidden · transaction integrity defends address substitution and uses exact approvals · recovery works without creating an attacker path · only audited primitives and reviewed dependencies sit in the money path · the regulatory surface and a required professional audit are mapped.

## Guardrails & escalation

This is a design-and-architecture method with security humility — it is not a security guarantee, not an audit, and not legal advice. Never roll your own cryptography; use audited libraries. Do not claim WYSIWYS or perfect key protection on a host you don't control — state the limit and raise the attacker's cost. Before a wallet handles real value, a professional security audit and cryptography review are mandatory, and every regulatory question (money transmission, custody, KYC/AML, securities) is routed to qualified counsel and licensed specialists. When in doubt about a security or compliance decision, escalate to a human expert rather than shipping the assumption.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Related: the Custos self-custody wallet + DEX case study (https://edwson.com/project-custos.html) and Echo Lattice signing study as worked design references; the MySQL backend and AWS cloud-architect skills for the surrounding infrastructure. Cryptographic and regulatory specifics must be verified with audited sources and qualified specialists.
