import { Ability } from '../src/classesForSaga/ability';
import { Battle } from '../src/classesForSaga/battle';
import { CharacterFactory } from '../src/classesForSaga/characterFactory';
import { DamageType } from '../src/classesForSaga/damageTypes';
import { Debuff } from '../src/classesForSaga/debuffInterface';
import { Equipment } from '../src/classesForSaga/equipment';
import { Hero } from '../src/classesForSaga/hero';
import { Weapons } from '../src/classesForSaga/weaponsAndAbilities';


describe('Equipment', () => {
  it('should create an equipment instance with correct properties', () => {
    const sword = new Equipment('Sword', 25, DamageType.physical);
    expect(sword.name).toBe('Sword');
    expect(sword.damage).toBe(25);
    expect(sword.damageType).toBe(DamageType.physical);
  });
});

describe('Character', () => {
  let hero;

  beforeEach(() => {
    hero = new Hero('Geralt', 'Warrior');
  });

  it('should create a character with correct initial properties', () => {
    expect(hero.name).toBe('Geralt');
    expect(hero.health).toBe(120);
    expect(hero.currentMana).toBe(50);
    expect(hero.canAttack).toBe(true);
  });

  it('should add an ability to the character', () => {
    const ability = new Ability(
      'Fire Arrow',
      () => ({ name: 'Fire Arrow', duration: 1, effect: () => {}, affectsAttack: false }),
      3,
    );
    const message = hero.addAbility(ability);
    expect(message).toBe('Geralt learns ability: Fire Arrow.');
    expect(hero.abilities).toContain(ability);
  });

  it('should apply a debuff to the character', () => {
    const debuff: Debuff = {
      name: 'Stun',
      duration: 1,
      effect: char => (char.canAttack = false),
      affectsAttack: true,
    };
    hero.applyDebuff(debuff);
    expect(hero.debuffs).toContain(debuff);
    expect(hero.canAttack).toBe(false);
  });

  it('should restore health to the maximum', () => {
    hero.health = 50;
    hero.restoreHealth();
    expect(hero.health).toBe(hero.maxHealth);
  });

  it('should update debuffs and affect attack ability', () => {
    const debuff: Debuff = {
      name: 'Stun',
      duration: 1,
      effect: char => (char.canAttack = false),
      affectsAttack: true,
    };
    hero.applyDebuff(debuff);
    hero.updateDebuffs();
    expect(hero.debuffs).toHaveLength(0);
    expect(hero.canAttack).toBe(true);
  });

  it('should attack another character correctly', () => {
    const target = new Hero('Target', 'Mage');
    hero.attack(target);
    expect(target.health).toBeLessThan(target.maxHealth);
    expect(target.health).toBeCloseTo(52.5);
  });

  it('should not attack if character cannot attack', () => {
    const target = new Hero('Target', 'Mage');
    const debuff: Debuff = {
      name: 'Stun',
      duration: 1,
      effect: char => (char.canAttack = false),
      affectsAttack: true,
    };
    hero.applyDebuff(debuff);
    const result = hero.attack(target);
    expect(result).toBe('Geralt cannot attack!');
  });
});

describe('Ability', () => {
  it('should create an ability instance with correct properties', () => {
    const ability = new Ability(
      'Fireball',
      () => ({ name: 'Fireball', duration: 1, effect: () => {}, affectsAttack: false }),
      3,
    );
    expect(ability.name).toBe('Fireball');
    expect(ability.usageLimit).toBe(3);
  });
});

describe('Battle', () => {
  it('should throw an error if the player count is odd', () => {
    expect(() => new Battle(3)).toThrow('Player count must be even.');
  });

  it('should start a battle and declare a winner', () => {
    const battle = new Battle(2);
    expect(battle).toBeDefined();
  });
});

describe('CharacterFactory', () => {
  it('should create a random character', () => {
    const character = CharacterFactory.createRandomCharacter();
    expect(character).toBeDefined();
  });

  it('should create a custom character', () => {
    const abilities = [
      new Ability('Fireball', () => ({ name: 'Fireball', duration: 1, effect: () => {}, affectsAttack: false }), 1),
    ];
    const customCharacter = CharacterFactory.createCustomCharacter(
      'CustomHero',
      'Mage',
      'magicStaff',
      { physical: 0, magic: 30 },
      abilities,
    );
    expect(customCharacter.name).toBe('CustomHero');
    expect(customCharacter.weapon).toBe(Weapons.magicStaff);
    expect(customCharacter.resists).toEqual({ physical: 0, magic: 30 });
    expect(customCharacter.abilities).toContain(abilities[0]);
  });
});
