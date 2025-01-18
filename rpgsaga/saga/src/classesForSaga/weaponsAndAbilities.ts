import { Ability } from './ability';
import { DamageType } from './damageTypes';
import { Equipment } from './equipment';

export const Weapons = {
  sword: new Equipment('Sword', 25, DamageType.physical),
  magicStaff: new Equipment('Magic Staff', 15, DamageType.magic),
  bow: new Equipment('Bow', 20, DamageType.physical),
};

export const Abilities = [
    
    new Ability(
        'Fire Arrows',
        () => ({
            name: 'Fire Arrows',
            duration: 1,
            effect: char => (char.health -= 15),
            affectsAttack: false,
        }),
        1,
    ),
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
];
