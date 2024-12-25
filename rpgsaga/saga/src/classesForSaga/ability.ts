import { Character } from './character';
import { Debuff } from './debuffInterface';

export class Ability {
  constructor(
    public readonly name: string,
    public readonly effect: (target: Character) => Debuff,
    public usageLimit: number,
    public readonly maxUsageLimit: number = usageLimit,
  ) {}
}
