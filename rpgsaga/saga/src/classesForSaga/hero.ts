import { Character } from './character';
import { Weapons } from './weaponsAndAbilities';

export class Hero extends Character {
  constructor(name: string, classType: 'Warrior' | 'Mage' | 'Archer') {
    let stats;

    switch (classType) {
      case 'Warrior':
        stats = { maxHealth: 120, maxMana: 50, resists: { physical: 20, magic: -10 }, weapon: Weapons.sword };
        break;
      case 'Mage':
        stats = { maxHealth: 80, maxMana: 100, resists: { physical: -10, magic: 30 }, weapon: Weapons.magicStaff };
        break;
      case 'Archer':
        stats = { maxHealth: 90, maxMana: 60, resists: { physical: 10, magic: -20 }, weapon: Weapons.bow };
        break;
    }

    super(name, stats.maxHealth, stats.maxMana, stats.resists, stats.weapon);
  }
}
