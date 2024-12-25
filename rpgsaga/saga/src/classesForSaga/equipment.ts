import { DamageType } from './damageTypes';

export class Equipment {
  constructor(
    public readonly name: string,
    public readonly damage: number,
    public readonly damageType: DamageType,
  ) {}
}
