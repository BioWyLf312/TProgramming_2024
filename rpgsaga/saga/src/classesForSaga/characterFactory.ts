import { Ability } from './ability';
import { Character } from './character';
import { Hero } from './hero';
import { Abilities, Weapons } from './weaponsAndAbilities';

export class CharacterFactory {
  static createRandomCharacter(): Character {
    const classes = ['Warrior', 'Mage', 'Archer'] as const;
    const randomClass = classes[Math.floor(Math.random() * classes.length)];

    const randomName = characterNames[Math.floor(Math.random() * characterNames.length)];

    const hero = new Hero(randomName, randomClass);
    hero.addAbility(Abilities[Math.floor(Math.random() * Abilities.length)]);
    return hero;
  }

  static createCustomCharacter(
    name: string,
    className: 'Warrior' | 'Mage' | 'Archer',
    weapon: keyof typeof Weapons,
    resists: { physical: number; magic: number },
    abilities: Ability[],
  ): Character {
    const hero = new Hero(name, className);
    hero.weapon = Weapons[weapon];
    hero.resists = resists;
    abilities.forEach(ability => hero.addAbility(ability));
    return hero;
  }
}

export const characterNames = [
  'Geralt',
  'Dovahkiin',
  'Ezio',
  'Link',
  'Kratos',
  'Alucard',
  'Sephiroth',
  'Cloud',
  'Arthur',
  'Ciri',
  'Lara',
  'Yuna',
  'Tifa',
  'Aerith',
  'Aloy',
  'Jill',
  'Ellie',
  'Samus',
  'Triss',
  'Shepard',
];
