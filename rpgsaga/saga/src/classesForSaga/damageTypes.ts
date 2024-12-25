export const DamageType = {
  physical: 'physical',
  magic: 'magic',
} as const;
export type DamageType = keyof typeof DamageType;
