import { Ability } from './ability';
import { DamageType } from './damageTypes';
import { Debuff } from './debuffInterface';
import { Equipment } from './equipment';

export class Character {
  health: number;
  currentMana: number;
  debuffs: Debuff[] = [];
  weapon?: Equipment;
  abilities: Ability[] = [];
  canAttack = true;

  constructor(
    public readonly name: string,
    public readonly maxHealth: number,
    public readonly maxMana: number,
    public resists: { physical: number; magic: number },
    weapon?: Equipment,
  ) {
    this.health = maxHealth;
    this.currentMana = maxMana;
    this.weapon = weapon;
  }

  addAbility(ability: Ability): string {
    this.abilities.push(ability);
    return `${this.name} learns ability: ${ability.name}.`;
  }

  applyDebuff(debuff: Debuff) {
    this.debuffs.push(debuff);
    debuff.effect(this);
    if (debuff.affectsAttack) {
      this.canAttack = false;
    }
  }

  restoreHealth() {
    this.health = this.maxHealth;
  }

  updateDebuffs() {
    this.debuffs = this.debuffs.filter(debuff => --debuff.duration > 0);
    this.canAttack = !this.debuffs.some(debuff => debuff.affectsAttack);
  }

  attack(target: Character): string {
    if (!this.canAttack) {
      return `${this.name} cannot attack!`;
    }

    const weaponDamage = this.weapon?.damage || 0;
    const damageType = this.weapon?.damageType || DamageType.physical;
    let effectiveDamage = weaponDamage;

    if (damageType === DamageType.physical) {
      effectiveDamage *= 1 - target.resists.physical / 100;
    } else {
      effectiveDamage *= 1 - target.resists.magic / 100;
    }

    effectiveDamage = Math.max(0, effectiveDamage);
    target.health = Math.max(0, target.health - effectiveDamage);

    return `${this.name} attacks ${target.name} with ${this.weapon?.name || 'bare hands'}, dealing ${effectiveDamage} damage!`;
  }

  useAbility(target: Character, ability: Ability): string {
    if (!this.abilities.includes(ability) || ability.usageLimit <= 0) {
      return `${this.name} tries to use ${ability.name}, but fails and attacks instead! ${this.attack(target)}`;
    }

    const debuff = ability.effect(target);
    target.applyDebuff(debuff);
    ability.usageLimit--;

    return `${this.name} uses ${ability.name} on ${target.name}.`;
  }

  refreshAbilities() {
    this.abilities.forEach(ability => (ability.usageLimit = ability.maxUsageLimit));
  }

  getInfo(): string {
    const abilityNames = this.abilities.map(ability => ability.name).join(', ') || 'No abilities';
    return `${this.name}: Health=${this.health}, Mana=${this.currentMana}, Can attack=${this.canAttack}. Abilities: ${abilityNames}.`;
  }
}
