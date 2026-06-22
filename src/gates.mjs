// gates.mjs — human gates. The harness records them; it never bypasses them.
// A gate is APPROVED only when a human name is supplied (--approve / --signoff).
// Otherwise it stays PENDING and the run is reported as not-yet-shippable.

export function gate(name, role, approver) {
  const approved = !!(approver && String(approver).trim());
  return {
    name,
    role,
    status: approved ? 'approved' : 'pending',
    by: approved ? String(approver).trim() : null,
    at: approved ? new Date().toISOString() : null,
  };
}

export const allCleared = (gates) => gates.every((g) => g.status === 'approved');

export const gateLine = (g) =>
  g.status === 'approved'
    ? `✓ ${g.name} — approved by ${g.by}`
    : `⏸ ${g.name} — PENDING HUMAN (${g.role})`;
