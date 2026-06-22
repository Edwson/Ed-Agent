// agents.mjs — the conductor. Specialist squads now live per-mission
// (src/missions/*.mjs) so the roster swaps with the kind of work.
export const CONDUCTOR = {
  id: 'ed',
  name: 'Ed Agent',
  role: 'Conductor · product judgment',
  one: 'Distilled product judgment. Routes the brief, keeps human judgment, holds the gates, owns sign-off.',
};

/** Name of the squad member who owns a mission stage (else the conductor). */
export function stageOwnerName(mission, stage) {
  const id = mission.stageOwners && mission.stageOwners[stage];
  if (!id) return CONDUCTOR.name;
  const a = (mission.squad || []).find((s) => s.id === id);
  return a ? a.name : CONDUCTOR.name;
}
