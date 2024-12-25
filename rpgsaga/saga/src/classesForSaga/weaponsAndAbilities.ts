import { Ability } from './ability';
import { DamageType } from './damageTypes';
import { Equipment } from './equipment';

export const Weapons = {
  sword: new Equipment('Sword', 25, DamageType.physical),
  magicStaff: new Equipment('Magic Staff', 15, DamageType.magic),
  axe: new Equipment('Axe', 30, DamageType.physical),
  bow: new Equipment('Bow', 20, DamageType.physical),
};

export const Abilities = [
  new Ability(
    'Frozen Arrows',
    () => ({
      name: 'Frozen Arrows',
      duration: 2,
      effect: char => (char.canAttack = false),
      affectsAttack: true,
    }),
    1,
  ),

  new Ability(
    'Fireball',
    () => ({
      name: 'Fireball',
      duration: 1,
      effect: char => (char.health -= 15),
      affectsAttack: false,
    }),
    1,
  ),
];
